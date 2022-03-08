import React, {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import BillPayModal from "../../modal/bill/BillPayModal"
import BillPayModalEdit from "../../modal/bill/BillPayModalEdit"
import BillReceiveModal from "../../modal/bill/BillReceiveModal"
import BillReceiveModalEdit from "../../modal/bill/BillReceiveModalEdit"
import DeleteModal from "../../modal/deleteModal";


export const TableBill = ( props ) => {

  const { tableName, columns, data, billPaymentStatus, billModalEdit, billModal, linkCadastro, collection2, setCollection2, handleDelete, searchPlaceholderName } = props;

  const chooseModal = ( modalName, data, installment ) => {

    let modalNames = {
      'BillPayModalEdit': <BillPayModalEdit data={data} installment={installment}/>,
      'BillPayModal': <BillPayModal data={data} installment={installment}/>,
      'BillReceiveModalEdit': <BillReceiveModalEdit data={data} installment={installment}/>,
      'BillReceiveModal': <BillReceiveModal data={data} installment={installment}/>
    }

    return modalNames[modalName]
  }

  const countPerPage = 10;
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

    let installmentsToBePaid = installmentsData.filter( data => data['paymentStatus'] === billPaymentStatus )

    const installmentsRows = installmentsToBePaid.map( (data, index) => {

      let currentInstallment = data['installment']  
      let tableCell = Object.keys( columns );
      let rowData = tableCell.map( (keyD, i) => {

        if ( keyD === 'dueDate' ) {
          return <td key={i}>{ `${new Date( data['dueDate'] ).toLocaleDateString('pt-br')}` }</td>;
        }

        if ( keyD === "service" ) {

          let servicesNames = {
            'proposta': "Proposta",
            'ordemServico': "Ordem de Serviço",
            'vendaProduto': "Venda de Produto",
          }
          return <td key={i}>{ servicesNames[ key[keyD] ]}</td>;
        }

        if ( keyD === 'installments' ) {
          return <td key={i}>{currentInstallment}/{totalInstallments}</td>;
        }

        if ( keyD === 'amountPay' ) {
          return <td key={i}>R$ {key['amountPay']}</td>;
        }

        if ( keyD === 'installmentAmountPay' ) {
          return <td key={i}>R$ {data['installmentAmountPay']}</td>;
        }

        if ( keyD === 'paymentType' ) {
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

        if ( keyD === 'action' ) {
          return createActionButtons( i, key, currentInstallment );
        }
  
        if ( keyD === 'baixa' ) {
          return createDarBaixaButton( i,key, currentInstallment );
        }

        return <td key={i}>{key[keyD]}</td>;

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

  const createActionButtons = ( i, rowData, installment ) => {
    
    let {id} = rowData
    return <td key={i}>
      
      {chooseModal( billModalEdit, rowData, installment )}

      <DeleteModal id={id} deleteFunction={handleDelete} collection={collection2} setCollection={setCollection2} />

    </td>;  
  }

  const createDarBaixaButton = ( i, rowData, installment ) => {
    return <td key={i}>
      {chooseModal( billModal, rowData, installment )}
    </td>; 
  }


  const searchMethod = ( value ) => {

      return cloneDeep( data
        .filter( item => 
          item.name.toLowerCase().indexOf( value ) > -1 ||
          item.amountPay.toLowerCase().indexOf( value ) > -1
        )
        .slice(0, countPerPage)
      );
  }


  return (
    <main className="table__container">
      <div className="table__titleAndSearch--container">

        <h3 className="table__titleAndSearch--title">{ tableName }</h3>

        <div className="table__container--searchAndAdd">
          
          <input
            className="table__titleAndSearch--search"
            placeholder={ searchPlaceholderName }
            onChange={ e => {

              let value = e.target.value
              let dataSearch = searchMethod( value.toLowerCase() )
              setCollection2(dataSearch);
                
            }}
          />

          <a href={linkCadastro} className="table__button--add">								  
            <button className="form__button form__button--add table__button--add">Adicionar</button>
          </a>

        </div>


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