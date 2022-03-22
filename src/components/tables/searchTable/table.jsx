import { React, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import './table.css';

import { DeleteOutline } from "@material-ui/icons";
import { Customer } from "../../../data/Customer1";
import { Supplier } from "../../../data/Supplier1";
import { Employee } from "../../../data/Employee1";

export const Table = ( props ) => {

  const { tableName, columns, data, link, linkCadastro, collection2, setCollection2 } = props;

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

      if ( keyD === 'action' ) {
        return createActionButtons( i, key );
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

  const handleDelete = async ( data, id ) => {
    console.log('item to delete: ' + id );
      
    if ( link === "cliente" ) {
      const customer = new Customer( { data: data, id: id } )
      let result = await customer.deleteCustomerFromFirebase();

      if ( result ) {
        setCollection2( collection2.filter( item => item.id !== id ) )
      }
      else {
        alert( "Algo deu errado ao apagar as informações, por favor tente novamente." )
        window.location.reload();
      }
      
    }
    else if ( link === "fornecedor" ) {
      const supplier = new Supplier( { data: data, id: id } )
      let result = await supplier.deleteSupplierFromFirebase();

      if ( result ) {
        setCollection2( collection2.filter( item => item.id !== id ) )
      }
      else {
        alert( "Algo deu errado ao apagar as informações, por favor tente novamente." )
        window.location.reload();
      }
    }

    else if ( link === "funcionario" ) {
      const employee = new Employee( { data: data, id: id } )
      let result = await employee.deleteEmployeeFromFirebase();

      if ( result ) {
        setCollection2( collection2.filter( item => item.id !== id ) )
      }
      else {
        alert( "Algo deu errado ao apagar as informações, por favor tente novamente." )
        window.location.reload();
      }
    }
    
  }

 
  const createActionButtons = ( i, rowData ) => {

    let {id} = rowData
    let localStorageName = () => {

      switch( link ) {

        case "cliente":
          return 'customerInfo';

        case "fornecedor":
          return 'supplierInfo';

        case "funcionario":
          return 'employeeInfo';
          
        default:
          return null
      }
    }

    return <td key={i}>
      <a href={`${link}/${id}`} target="_blank" rel="noreferrer" className="link">
        <button className="userListEdit" onClick={ () => { localStorage.setItem( localStorageName(), JSON.stringify(rowData) ) }}>
          Editar
        </button>
      </a>

      <DeleteOutline
        className="userListDelete"
        onClick={ async () => await handleDelete( rowData, id )}
      />

    </td>;  
  }

  const searchMethod = ( value ) => {

    if ( link === "cliente" ) {
      return cloneDeep( data
        .filter( item => 
          item.contact.toLowerCase().indexOf( value ) > -1 ||
          item.fantasy_name.toLowerCase().indexOf( value ) > -1 ||
          item.cnpj_cpf.toLowerCase().indexOf( value ) > -1 ||
          item.email.toLowerCase().indexOf( value ) > -1 ||
          item.telephone.toLowerCase().indexOf( value ) > -1 ||
          item.mobile.toLowerCase().indexOf( value ) > -1 ||
          item.city.toLowerCase().indexOf( value ) > -1 
        )
        .slice(0, countPerPage)
      );
    }
    else if ( link === "fornecedor" ) {
      return cloneDeep( data
        .filter( item => 
          item.contact.toLowerCase().indexOf( value ) > -1 ||
          item.email.toLowerCase().indexOf( value ) > -1 ||
          item.telephone.toLowerCase().indexOf( value ) > -1 ||
          item.mobile.toLowerCase().indexOf( value ) > -1 ||
          item.cnpj_cpf.toLowerCase().indexOf( value ) > -1 ||
          item.city.toLowerCase().indexOf( value ) > -1 
        )
        .slice(0, countPerPage)
      );
    }
    else if ( link === "funcionario" ) {
      return cloneDeep( data
        .filter( item => 
          item.name.toLowerCase().indexOf( value ) > -1 ||
          item.email.toLowerCase().indexOf( value ) > -1 ||
          item.telephone.toLowerCase().indexOf( value ) > -1 ||
          item.mobile.toLowerCase().indexOf( value ) > -1 ||
          item.cpf.toLowerCase().indexOf( value ) > -1 ||
          item.city.toLowerCase().indexOf( value ) > -1 
        )
        .slice(0, countPerPage)
      );
    }
  }

  const searchPlaceholderName = () => {
    switch( link ) {
      case "cliente":
        return 'Procurar cliente';

      case "fornecedor":
        return 'Procurar fornecedor';

      case "funcionario":
        return 'Procurar funcionário';
        
      default:
        return ""
    }
  }

  return (
    <main className="table__container">
      <div className="table__titleAndSearch--container">

        <h3 className="table__titleAndSearch--title">{ tableName }</h3>
      
        <div className="table__container--searchAndAdd">
            
            <input
              className="table__titleAndSearch--search"
              placeholder={ searchPlaceholderName() }
              onChange={ e => {

                let value = e.target.value
                let dataSearch = searchMethod( value )
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