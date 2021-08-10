import React from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import './table.css';

import { DeleteOutline } from "@material-ui/icons";

import { allData } from "../../assets/mock/tableData";
import { Link } from "react-router-dom";


const tableHead = {
  id: "ID",
  name: "Nome",
  email: "Email",
  phone: "Telefone",
  company: "Empresa",
  action: "Opções"
};

const Table = (props) => {

  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

  const searchData = React.useRef(
    throttle(val => {

      const query = val.toLowerCase();
      setCurrentPage(1);
  
      const data = cloneDeep(
        allData
          .filter(item => item.name.toLowerCase().indexOf(query) > -1 || item.email.toLowerCase().indexOf(query) > -1 || item.phone.toLowerCase().indexOf(query) > -1 )
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {

      if ( keyD === 'action' ) {
        return createActionButtons( i,key["id"] );
      }

      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  const handleDelete = ( key ) => {
    console.log('item to delete: ' + key );
    setCollection( collection.filter( item => item.id !== key ) )
    
  }

  const createActionButtons = ( i, key ) => {
    return <td key={i}>
      <Link to={"/cliente/" + key } className="link">
        <button className="userListEdit">Editar</button>
      </Link>

      <DeleteOutline
        className="userListDelete"
        onClick={() => handleDelete( key )}
      />

    </td>;  
  }

  return (
    <main>
      <div class="table__titleAndSearch--container">

        <h3 className="table__titleAndSearch--title">{props.tableName}</h3>

        <input
          className="table__titleAndSearch--search"
          placeholder="Procurar cliente"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
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
        total={allData.length}
        className="table__pagination"
      />

    </main>
      
  );
};
export default Table;
