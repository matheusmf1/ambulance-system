import React, {useState} from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { DeleteOutline } from "@material-ui/icons";

import BillPayModal from "../../modal/bill/BillPayModal"
import BillPayModalEdit from "../../modal/bill/BillPayModalEdit"
import BillReceiveModal from "../../../components/modal/bill/BillReceiveModal"
import BillReceiveModalEdit from "../../../components/modal/bill/BillReceiveModalEdit"


export const Table = ( props ) => {

  const { tableName, columns, data, billModalEdit, billModal, linkCadastro } = props;

  const chooseModal = ( modalName, data ) => {

    let modalNames = {
      'BillPayModalEdit': <BillPayModalEdit data={data}/>,
      'BillPayModal': <BillPayModal data={data}/>,
      'BillReceiveModalEdit': <BillReceiveModalEdit data={data}/>,
      'BillReceiveModal': <BillReceiveModal data={data}/>
    }

    return modalNames[modalName]
  }

  const countPerPage = 5;
  const [searchValue, setSearchValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);

  const [collection, setCollection] = React.useState(
    cloneDeep(data.slice(0, countPerPage))
  );

  const searchData = React.useRef( throttle(val => { 
    
    const query = val.toLowerCase();
    setCurrentPage(1);
  
    const dataSearch = cloneDeep( 
      data
        .filter(item => item.name.toLowerCase().indexOf(query) > -1 || item.dueDate.toLowerCase().indexOf(query) > -1 || item.amountPay.toLowerCase().indexOf(query) > -1 || item.paymentType.toLowerCase().indexOf(query) > -1 )
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

  const tableRows = (rowData) => {

    let { key, index } = rowData;

    let tableCell = Object.keys( columns );

    let columnData = tableCell.map((keyD, i) => {

      if ( keyD === 'action' ) {
        return createActionButtons( i,key["id"] );
      }

      if ( keyD === 'baixa' ) {
        return createDarBaixaButton( i,key["id"] );
      }

      if ( keyD === 'dueDate' ) {
        return <td key={i}>{ `${new Date( key[keyD] ).toLocaleDateString('pt-br')}` }</td>;
      }

      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const handleDelete = ( key ) => {
    console.log('item to delete: ' + key );
    setCollection( collection.filter( item => item.id !== key ) )   
  }

  const createActionButtons = ( i, id ) => {

    let data = collection.filter( item => item.id === id )[0]

    return <td key={i}>
      
      {chooseModal( billModalEdit, data )}

      <DeleteOutline
        className="userListDelete"
        onClick={() => handleDelete( id )}
      />

    </td>;  
  }

  const createDarBaixaButton = ( i, id ) => {
    let data = collection.filter( item => item.id === id )[0]
    return <td key={i}>
      {chooseModal( billModal, data )}
    </td>; 
  }

  return (
    <main className="table__container">
      <div className="table__titleAndSearch--container">

        <h3 className="table__titleAndSearch--title">{ tableName }</h3>

        <div className="table__container--searchAndAdd">
          
          <input
            className="table__titleAndSearch--search"
            placeholder="Procurar cliente"
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