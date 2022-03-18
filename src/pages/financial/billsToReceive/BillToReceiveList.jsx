import { React, Component } from 'react';
import { TableBill } from '../../../components/tables/bills/tableBill';
import { db } from "../../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import { Bill } from "../../../data/Bill";

export default class BillToReceiveList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: []
    }

    this.editarModal = "BillReceiveModalEdit"
    this.darBaixaModal = "BillReceiveModal"
  }

  tableColumns = {
    name: "Empresa/Fornecedor",
    service: "Serviço",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções"
  };

  componentDidMount = async () => {

    const billCollectionRef = collection( db, "bills_receive" )
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
      
      const bill = new Bill( { id: id, billType: "receive" } );
      return await bill.deleteBillFromFirebase();
    }
    
    return (
      <>
        <TableBill
          tableName="Contas a Receber"
          columns={ this.tableColumns }
          data={ this.state.tableData }
          billPaymentStatus="toReceive"
          billModalEdit={ this.editarModal }
          billModal={ this.darBaixaModal }
          linkCadastro="/financeiro/receber/cadastro"
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Procurar empresa ou valor total" }
        />
      </>
    )
  }

}