import { React, Component } from 'react'
import { TableBill } from '../../../components/tables/bills/tableBill';

import { db } from "../../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import { Bill } from "../../../data/Bill";


export default class BillToPayList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: []
    }

    this.editarModal = "BillPayModalEdit"
    this.darBaixaModal = "BillPayModal"
  }

  tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções"
  };

  componentDidMount = async () => {

    const billCollectionRef = collection( db, "bills_pay" )
    const queryResult = query( billCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { tableData: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => this.setState( { collection: this.state.tableData.slice( 0, 10 ) } ));

  };

  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id ) => {
      
      const bill = new Bill( { id: id, billType: "pay" } )
      let result = await bill.deleteBillFromFirebase();

      return result
      
      // if ( result ) {
      //   setCollection( this.state.collection.filter( item => item.id !== id ) )
      // }
      // else {
      //   alert( "Algo deu errado ao apagar as informações, por favor tente novamente." )
      //   window.location.reload();
      // }
    }
    
    return (
      <>
        <TableBill
          tableName="Contas a Pagar"
          columns={ this.tableColumns }
          data={ this.state.tableData }
          billPaymentStatus="toPay"
          billModalEdit={ this.editarModal }
          billModal={ this.darBaixaModal }
          linkCadastro="/financeiro/pagar/cadastro"
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Procurar empresa ou valor total" }
        />
      </>
    )
  }

}