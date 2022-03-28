import { React, Component } from 'react'


import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import { InventoryTable } from '../../components/tables/inventory/InventoryTable';
import { Inventory } from "../../data/Inventory";
import LoadingSpinner from '../../components/LoadingSpinner';


export default class InventoryList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      collection: [],
      loading: true
    }
  }

  tableColumns = {
    id: "Código do Produto",
    supplier_id: "Fornecedor",
    product_name: "Nome",
    product_quantity: "Quantidade",
    product_value: "Valor Unitário",
    product_entryDate: "Data de entrada",
    action: "Opções"
  };

  componentDidMount = async () => {

    const inventoryCollectionRef = collection( db, "inventory" )

    const queryResult = query( inventoryCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { inventory: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => {
        this.setState( { collection: this.state.inventory.slice( 0, 10 ) } )
        this.setState( { loading: false } )
      });
  };


  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id ) => {
      const data = new Inventory( { id: id  } );
      return await data.deleteMaterialInventoryFromFirebase();
    }
    
    return (
      <>
       { 
        this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
          <InventoryTable
            tableName="Estoque"
            columns={ this.tableColumns }
            data={ this.state.inventory }
            link="almoxarifado"
            linkCadastro="/almoxarifado/cadastro"
            collection2={this.state.collection}
            setCollection2={ setCollection }
            handleDelete={ handleDelete }
            searchPlaceholderName={ "Cod.Produto, Fornecedor, Nome..." }
          />
          )
        }
      </>
    )
  }
}