import React, {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import DeleteModal from "../../modal/deleteModal";

export const TablePaidReceivedBill = ( props ) => {

  const { tableName, columns, data, billInfoLink, linkCadastro } = props;

  const countPerPage = 5;
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [collection, setCollection] = React.useState(
    cloneDeep(data.slice(0, countPerPage))
  );

  const searchData = React.useRef( throttle(val => { 
    
    const query = val.toLowerCase();
    setCurrentPage(1);
  
    const dataSearch = cloneDeep( 
      data
        // .filter(item => item.name.toLowerCase().indexOf(query) > -1 || item.dueDate.toLowerCase().indexOf(query) > -1 || item.amountPay.toLowerCase().indexOf(query) > -1 || item.paymentType.toLowerCase().indexOf(query) > -1 )
        .filter(item => item.name.toLowerCase().indexOf(query) > -1 || item.amountPay.toLowerCase().indexOf(query) > -1 )
        .slice(0, countPerPage)
      );

    setCollection(dataSearch);
    }, 400)
  );

  // AQUI ESTA O PROBLEMA DE DUPLA RENDERIRACAO
  React.useEffect(() => {
    if ( !searchValue ) {
      updatePage(1);
    } else {
      searchData.current(searchValue);
    }

  }, [searchValue]);

  const updatePage = (p) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(data.slice(from, to)));
  };

  const headRow = () => {
    return Object.values( columns ).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
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
          'proposta': "Proposta",
          'ordemServico': "Ordem de Serviço",
          'vendaProduto': "Venda de Produto",
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
          'transferência': "Transferência",
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

  const createActionButtons = ( i, rowData ) => {
    
    let {id} = rowData
    return <td key={i}>

      <a href={`${billInfoLink}/${id}`} target="_blank" rel="noreferrer">
        <button className="userListEdit modal__button" variant="outlined" onClick={ () => { localStorage.setItem('billInfo', JSON.stringify(rowData)) }}>
          Visualizar
        </button>
      </a>

      <DeleteModal id={id}/>

    </td>;  
  }

  return (
    <main className="table__container">
      <div className="table__titleAndSearch--container">

        <h3 className="table__titleAndSearch--title">{ tableName }</h3>

        <div className="table__container--searchAndAdd">
          
          <input
            className="table__titleAndSearch--search"
            placeholder="Procurar empresa, valor total..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />

          <a href={linkCadastro} className="table__button--add">								  
            <button className="form__button form__button--add table__button--add">Adicionar</button>
          </a>

        </div>


      </div>
      
      <table className="table">
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody>{tableData()}</tbody>
      </table>
      
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