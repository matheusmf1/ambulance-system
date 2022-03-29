import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import BillPayModal from "../../modal/bill/BillPayModal";
import BillReceiveModal from "../../modal/bill/BillReceiveModal";
import './billStyle.css';

export const TableHomeBill = ( props ) => {

  const { tableName, columns, data, billPaymentStatus, billModal, collection2, setCollection2, lastDayOfCurrentMonth } = props;

  const chooseModal = ( modalName, data, installment ) => {

    let modalNames = {
      'BillPayModal': <BillPayModal data={data} installment={installment}/>,
      'BillReceiveModal': <BillReceiveModal data={data} installment={installment}/>
    }

    return modalNames[modalName]
  }

  const countPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection2(cloneDeep(data.slice(from, to)));
  };

  const tableRows = (rowData) => {

    let { index, key } = rowData;

    let totalInstallments = key['paymentInfo']['installments']
    let installmentsData = key['paymentInfo']['installmentsData']

    let installmentsToBePaid = installmentsData.filter( data => data['paymentStatus'] === billPaymentStatus && new Date( data['dueDate'] ) <= lastDayOfCurrentMonth )

    const installmentsRows = installmentsToBePaid.map( (data, index) => {

      let currentInstallment = data['installment']  
      let tableCell = Object.keys( columns );
      let rowData = tableCell.map( (keyD, i) => {

        if ( keyD === 'dueDate' ) {
          return <td key={i}>{ `${new Date( data['dueDate'] ).toLocaleDateString('pt-br')}` }</td>;
        }

        else if ( keyD === "service" ) {

          let servicesNames = {
            'transformationProposal': "Proposta",
            'serviceOrder': "Ordem de Serviço",
            'productsSale': "Venda de Produto",
          }
          return <td key={i}>{ servicesNames[ key[keyD] ]}</td>;
        }

        else if ( keyD === 'installments' ) {
          return <td key={i}>{currentInstallment}/{totalInstallments}</td>;
        }

        else if ( keyD === 'amountPay' ) {
          return <td key={i}>R$ {key['amountPay']}</td>;
        }

        else if ( keyD === 'installmentAmountPay' ) {
          return <td key={i}>R$ {data['installmentAmountPay']}</td>;
        }

        else if ( keyD === 'paymentType' ) {
          let paymentNames = {
            'boleto': "Boleto",
            'pix': "PIX",
            'transferencia': "Transferência",
            'deposito': "Depósito",
            'cheque': "Cheque",
            'dinheiro': "Dinheiro"
          }
          return <td key={i}>{ paymentNames[data['paymentType']]}</td>;
        }
  
        else if ( keyD === 'baixa' ) {
          return createDarBaixaButton( i,key, currentInstallment );
        }

        else if ( keyD === "currentPaymentDate" ) {
          let today = new Date();
          let dueDate = new Date( data['dueDate'] );

          if ( dueDate < today ) {
            return <td key={i}><h4 className="dueDate Overdue">Vencida</h4></td>;
          }
          else {
            return <td key={i}><h4 className="dueDate Due">A vencer</h4></td>;
          }
        }
        else {
          return <td key={i}>{key[keyD]}</td>;
        }


      })

      return <tr key={index}>{rowData}</tr>

    })

    return installmentsRows;
  
  }

  const tableData = () => {
    return collection2.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values( columns ).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  const createDarBaixaButton = ( i, rowData, installment ) => {
    return <td key={i}>
      {chooseModal( billModal, rowData, installment )}
    </td>; 
  }

  return (
    <main className="table__container">
      
      <div className="table__titleAndSearch--container">
        <h3 className="table__titleAndSearch--title">{ tableName }</h3>
      </div>


      <div className="table__container--area">
        <table className="table">
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody>{tableData()}</tbody>
        </table>
      </div>
      
      
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={data.length}
        className="table__pagination"
      />

    </main>
      
  );
};