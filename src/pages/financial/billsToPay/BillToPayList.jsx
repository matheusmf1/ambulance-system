import { React, Component } from 'react'
import { TableBill } from '../../../components/tables/bills/tableBill';
import { db, auth } from "../../../firebase";
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";
import { Bill } from "../../../data/Bill";
import LoadingSpinner from '../../../components/LoadingSpinner';


export default class BillToPayList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: [],
      loading: true
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

    const billCollectionRef = collection( db, `users/${auth.currentUser.uid}/bills_pay` )
    const queryResult = query( billCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { tableData: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => {
        this.setState( { collection: this.state.tableData.slice( 0, 10 ) } )
        this.setState( { loading: false } )
      });

  };

  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id ) => {     
      const bill = new Bill( { id: id, billType: "pay" } );
      return await bill.deleteBillFromFirebase();
    }
    
    return (
      <>
      {
        this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
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
        )
      }
      </>
    )
  }

}