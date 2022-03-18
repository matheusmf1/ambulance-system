import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import DeleteModal from "../modal/deleteModal";

export const TableQuoteSales = ( props ) => {

  const { tableName, columns, data, collection2, setCollection2, handleDelete, searchPlaceholderName, session } = props;

  const countPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);


  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection2(cloneDeep(data.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;

    const tableCell = Object.keys( columns );

    const columnData = tableCell.map((keyD, i) => {

      if ( keyD === "serviceType" ) {

        let servicesNames = {
          'transformationProposal': "Proposta de Transformação",
          'serviceOrder': "Ordem de Serviço",
          'productSale': "Venda de Produto",
        }
        return <td key={i}>{ servicesNames[ key[keyD] ]}</td>;
      }

      else if ( keyD === 'action' ) {
        return createActionButtons( i, key );
      }

      else if ( keyD === "status" ) {
        let statusName = {
          'cancelado_naoAprovado': tableName === "Orçamentos" ? "Não Aprovado" : "Cancelado",
          'emAndamento': "Em Andamento",
          'concluido': "Concluído",
          'aprovado': "Aprovado Orçamento",

        }
        return <td key={i}>{ statusName[ key[keyD] ]}</td>; 
      }

      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

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
    const localStorageName = () => {
      
      switch( rowData['serviceType'] ) {

        case "serviceOrder":
          return 'quoteSalesInfo';

        case "productsSale":
          return 'quoteSalesInfo';

        case "transformationProposal":
          return 'quoteSalesInfo';
          
        default:
          return null
      }
    }

    const sessionLink = ( serviceType, id ) => {

      let serviceName = "";
      if ( serviceType === "transformationProposal" ) {
        serviceName = "transformacao";
      }
      else if ( serviceType === "serviceOrder" ) {
        serviceName = "os";
      }
      else if ( serviceType === "productSale" ) {
        serviceName = "venda_produto";
      }

      return `${session}/${serviceName}/${id}`
    }

    return <td key={i}>
      <a href={ sessionLink( rowData[ 'serviceType' ], id ) } target="_blank" rel="noreferrer" className="link">
        <button className="userListEdit" onClick={ () => { localStorage.setItem( localStorageName(), JSON.stringify(rowData) ) }}>
          Visualizar
        </button>
      </a>

      <DeleteModal id={id} serviceType={rowData['serviceType']} deleteFunction={handleDelete} collection={collection2} setCollection={setCollection2} />

    </td>;  
  }

  const searchMethod = ( value ) => {

    let servicesNames = {
      'transformationProposal': "Proposta de Transformação",
      'serviceOrder': "Ordem de Serviço",
      'productSale': "Venda de Produto",
    }

    let statusName = {
      'cancelado_naoAprovado': tableName === "Orçamentos" ? "Não Aprovado" : "Cancelado",
      'emAndamento': "Em Andamento",
      'concluido': "Concluído",
      'aprovado': "Concluído",
    }


    return cloneDeep( data
      .filter( item => 
        item.id.toString().toLowerCase().indexOf( value ) > -1 ||
        servicesNames[ item.serviceType ].toLowerCase().indexOf( value ) > -1 ||
        item.companyName.toLowerCase().indexOf( value ) > -1 ||
        item.cpf.toLowerCase().indexOf( value ) > -1 ||
        item.email.toLowerCase().indexOf( value ) > -1 ||
        statusName[ item.status ].toLowerCase().indexOf( value ) > -1 
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
                let dataSearch = searchMethod( value )
                setCollection2(dataSearch);
                
              }}
            />

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