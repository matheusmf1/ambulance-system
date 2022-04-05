import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import DeleteModal from "../../modal/deleteModal";

export const InventoryTable = ( props ) => {

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

      if ( keyD === 'id' ) {
        let codProduto = key[ keyD ].split( '_' )[1]
        return <td key={i}>{codProduto}</td>;
      }

      else if ( keyD === 'product_entryDate' ) {
        return <td key={i}>{ `${new Date( key['product_entryDate'] ).toLocaleDateString('pt-br')}` }</td>;
      }

      else if ( keyD === 'product_underQuantityLimit' ) {

        if ( key[ 'product_underQuantityLimit' ] ) {
          return <td key={i}><h4 className="dueDate Overdue">Repor estoque</h4></td>;
        } else {
          return <td key={i}><h4 className="dueDate Due">Estoque OK</h4></td>;
        }
      }

      else if ( keyD === "product_value" || keyD === "product_totalValue" ) {
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

    let {id} = rowData
    
    return <td key={i}>
      <a href={`${link}/${id}`} target="_blank" rel="noreferrer" className="link">
        <button className="userListEdit" onClick={ () => { localStorage.setItem( "materialInfo", JSON.stringify(rowData) ) }}>
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
        item.id.toLowerCase().split( '_' )[1].indexOf( newValue ) > -1 ||
        item.supplier_id.toLowerCase().indexOf( newValue ) > -1 ||
        item.product_name.toLowerCase().indexOf( newValue ) > -1 ||
        item.product_quantity.toLowerCase().indexOf( newValue ) > -1 ||
        item.product_value.toLowerCase().indexOf( newValue ) > -1 ||
        new Date( item.product_entryDate ).toLocaleDateString('pt-br').indexOf( newValue ) > -1
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