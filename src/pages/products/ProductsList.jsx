import { React, Component } from 'react';


import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Product } from '../../data/Product';
import { ProductsTable } from '../../components/tables/products/ProductsTable';


export default class ProductsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      collection: []
    }
  }

  tableColumns = {
    id: "Etiqueta",
    product_sale_value: "Valor de Venda",
    action: "Opções"
  };

  componentDidMount = async () => {

    const dataCollectionRef = collection( db, "products" )
    const queryResult = query( dataCollectionRef );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { products: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => this.setState( { collection: this.state.products.slice( 0, 10 ) } ));

  };


  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id ) => {
      const data = new Product( { id: id  } );
      return await data.deleteProductFromFirebase();
    }
    
    return (
      <>
        <ProductsTable
          tableName="Lista de Produtos"
          columns={ this.tableColumns }
          data={ this.state.products }
          link="produtos"
          linkCadastro="/produtos/cadastro"
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Etiqueta, valor de venda" }
        />
      </>
    )
  }

}