import { React, Component } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Product } from '../../data/Product';
import { ProductsTable } from '../../components/tables/products/ProductsTable';
import LoadingSpinner from '../../components/LoadingSpinner';


export default class ProductsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      collection: [],
      loading: true
    }
  }

  tableColumns = {
    id: "Etiqueta",
    product_sale_value: "Valor de Venda",
    action: "Opções"
  };

  componentDidMount = async () => {

    const dataCollectionRef = collection( db, `users/${auth.currentUser.uid}/products` )
    const queryResult = query( dataCollectionRef );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { products: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => {
        this.setState( { collection: this.state.products.slice( 0, 10 ) } )
        this.setState( { loading: false } )
      });
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
      { 
        this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
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
        )
      }
      </>
    )
  }
}