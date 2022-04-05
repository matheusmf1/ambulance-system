import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import DeleteModal from "../../modal/deleteModal";

export const ProductsTable = ( props ) => {

  const { tableName, columns, data, link, linkCadastro, collection2, setCollection2, handleDelete, searchPlaceholderName } = props;

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

      if ( keyD === 'product_sale_value' ) {
        return <td key={i}>R$ {key[keyD]}</td>;
      }
      
      else if ( keyD === 'action' ) {
        return createActionButtons( i, key );
      }

      else {
        return <td key={i}>{key[keyD]}</td>;
      }

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

    let {id} = rowData;
    
    return <td key={i}>
      <a href={`${link}/${id}`} target="_blank" rel="noreferrer" className="link">
        <button className="userListEdit" onClick={ () => { localStorage.setItem( "productsInfo", JSON.stringify(rowData) ) }}>
          Editar
        </button>
      </a>

      <DeleteModal id={ `${id}`} deleteFunction={handleDelete} collection={collection2} setCollection={setCollection2} />

    </td>;  
  }

  const searchMethod = ( value ) => {

    let newValue = value.toLowerCase();

    return cloneDeep( data
      .filter( item => 
        item.product_sale_value.toLowerCase().indexOf( newValue ) > -1 ||
        item.id.toLowerCase().indexOf( newValue ) > -1
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

                setCollection2( searchMethod( e.target.value ) );
                
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