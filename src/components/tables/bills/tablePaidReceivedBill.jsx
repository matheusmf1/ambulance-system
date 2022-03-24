import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import DeleteModal from "../../modal/deleteModal";

export const TablePaidReceivedBill = ( props ) => {

  const { tableName, columns, data, billInfoLink, linkCadastro, collection2, setCollection2, handleDelete, searchPlaceholderName } = props;

  const countPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection2(cloneDeep(data.slice(from, to)));
  };

  const tableRows = ( { index, key } ) => {

    let totalInstallments = key['paymentInfo']['installments']
    let installmentsData = key['paymentInfo']['installmentsData']
    let dueDate = installmentsData[0]['dueDate']
    let installmentAmountPay = installmentsData[0]['installmentAmountPay']
    let paymentType = installmentsData[0]['paymentType']

    let tableCell = Object.keys( columns );
    let rowData = tableCell.map( (keyD, i) => {

      if ( keyD === 'dueDate' ) {
        return <td key={i}>{ `${new Date( dueDate ).toLocaleDateString('pt-br')}` }</td>;
      }

      if ( keyD === "service" ) {

        let servicesNames = {
          'transformationProposal': "Proposta",
          'serviceOrder': "Ordem de Serviço",
          'productSale': "Venda de Produto",
        }
        return <td key={i}>{ servicesNames[ key[keyD] ]}</td>;
      }

      if ( keyD === 'installments' ) {
        return <td key={i}>{totalInstallments}</td>;
      }

      if ( keyD === 'amountPay' ) {
        return <td key={i}>R$ {key['amountPay']}</td>;
      }

      if ( keyD === 'installmentAmountPay' ) {
        return <td key={i}>R$ {installmentAmountPay}</td>;
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
        return <td key={i}>{ paymentNames[paymentType]}</td>;
      }

      if ( keyD === 'action' ) {
        return createActionButtons( i, key );
      }

      return <td key={i}>{key[keyD]}</td>;

      })

    return <tr key={index}>{rowData}</tr>
  
  }

  const tableData = () => {
    return collection2.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values( columns ).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  const createActionButtons = ( i, rowData ) => {
    
    let {id} = rowData
    let localStorageName = () => {

      switch( billInfoLink ) {

        case "/financeiro/pagas":
          return 'billInfo';

        case "/financeiro/recebidos":
          return 'billInfo';
          
        default:
          return null
      }
    }
    return <td key={i}>

      <a href={`${billInfoLink}/${id}`} target="_blank" rel="noreferrer">
        <button className="userListEdit modal__button" variant="outlined" onClick={ () => { localStorage.setItem( localStorageName(), JSON.stringify(rowData)) }}>
          Visualizar
        </button>
      </a>

      <DeleteModal id={id} deleteFunction={handleDelete} collection={collection2} setCollection={setCollection2} />

    </td>;  
  }

  const searchMethod = ( value ) => {
    
    return cloneDeep( data.filter( item => 
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