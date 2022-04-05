import { React, Component } from 'react';
import { TableHomeBill } from './TableHomeBill';
import { db, auth } from "../../../firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import LoadingSpinner from '../../LoadingSpinner';


export default class UpComingBillReceive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      collection: [],
      loading: true
    }

    this.darBaixaModal = "BillReceiveModal"
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
  
    const billCollectionRef = collection( db, `users/${auth.currentUser.uid}/bills_receive` )
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
            tableName="Contas a receber nesse mês"
            columns={ this.tableColumns }
            data={ this.state.tableData }
            billPaymentStatus="toReceive"
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