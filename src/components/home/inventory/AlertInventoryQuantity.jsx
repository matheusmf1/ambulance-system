import { React, Component } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { TableAlertInventoryQuantity } from './TableAlertInventoryQuantity';


export default class AlertInventoryQuantity extends Component {

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
    product_quantityLimit: "Quantidade mínima",
    product_underQuantityLimit: "Status",
    action: "Opções"
  };

  componentDidMount = async () => {

    const inventoryCollectionRef = collection( db, "inventory" )

    const queryResult = query( inventoryCollectionRef, where( "product_underQuantityLimit", "==", true ) );
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
    
    return (
      <>
       { 
        this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
          <TableAlertInventoryQuantity
            tableName="Estoque - Materiais em falta"
            columns={ this.tableColumns }
            data={ this.state.inventory }
            link="almoxarifado"
            collection2={this.state.collection}
            setCollection2={ setCollection }
          />
          )
        }
      </>
    )
  }
}