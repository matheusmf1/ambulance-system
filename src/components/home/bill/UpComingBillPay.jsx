import { React, Component } from 'react';
import { TableHomeBill } from './tableHomeBill';
import { db } from "../../../firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Bill } from "../../../data/Bill";
import LoadingSpinner from '../../../components/LoadingSpinner';


export default class UpComingBillPay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: [],
      loading: true
    }

    this.editarModal = "BillPayModalEdit"
    this.darBaixaModal = "BillPayModal"
    this.currentDate = new Date();
    this.lastDayOfCurrentMonth = new Date( this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0 );
  }

  tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    installments: "Parcelas",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    currentPaymentDate: "Status",
    baixa: "Dar Baixa",
  };

  componentDidMount = async () => {
  
    const billCollectionRef = collection( db, "bills_pay" )
    const queryResult = query( billCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    const nextBillsCurrentMonth = docSnap.docs.map( doc => ( {...doc.data()} ) ).filter( bill => new Date( bill.currentPaymentDate ) <= this.lastDayOfCurrentMonth );
  
    this.setState( { tableData: nextBillsCurrentMonth },
    () => {
      this.setState( { collection: this.state.tableData.slice( 0, 5 ) } )
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
          <TableHomeBill
            tableName="Contas que vencem nesse mês"
            columns={ this.tableColumns }
            data={ this.state.tableData }
            billPaymentStatus="toPay"
            billModal={ this.darBaixaModal }
            collection2={ this.state.collection }
            setCollection2={ setCollection }
            lastDayOfCurrentMonth={ this.lastDayOfCurrentMonth }
          />
        )
      }
      </>
    )
  }

}