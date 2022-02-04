import { React, useState, useMemo, memo } from "react";

import { useTable } from "react-table";

import './table.css';

const TableInputNumber = props => {
  // console.log("TableInputNumber", props);
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return <input className="form__input--table" type="number" value={cell.value} onChange={onChange} />;
};

const TableInputText = props => {
  // console.log("TableInputText", props);
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return <input className="form__input--table" type="text" value={cell.value} onChange={onChange} />;
};

const TableText = props => {
  // console.log("TableInputText", props);
  const { column, row, cell, updateData } = props;
  const onChange = e => updateData(row.index, column.id, e.target.value);
  return <h5 onChange={onChange} className="tableOS__subTotal">R$ {cell.value}</h5>;
};

const ReactTable = memo( props => {

  // console.log("ReactTable Props", props);

  const { tableData, setTableData, setValorTotal } = props;
  const { initialData, somaTotalRow, somaTotalTextAndItens } = tableData;

  const tableColumns = tableData.columns

  tableColumns.forEach( item => {
    item['Cell'] = eval( item[ 'Cell' ] )
  });


  const columns = useMemo( () => tableColumns, [tableColumns] );

  const [ resetTable ] = useState( tableData['initialData'] )
  const resetData = () => {
    setTableData( {...tableData, "initialData": resetTable} )
  }


  const updateItemNumberAddRow = ( old ) => {

    let lastData = old[ old.length -1 ].item;
    let objKeys = Object.keys( initialData[0] )
    let newData = {}

    objKeys.forEach( key => {

      if (key === 'item') {
        newData[ key ] = lastData + 1
      }

      else {
        newData[ key ] = resetTable[0][ key ]
      }
    })

    return newData
  }

  const addRow = () => {
    let old = tableData['initialData']
    let newData = [...old, updateItemNumberAddRow( old )]  
    setTableData( { ...tableData,  "initialData": newData } )
  }

  const updateData = (rowIndex, columnID, value) => {

    let oldData = tableData['initialData']
  
    setTableData( {...tableData, "initialData": oldData.map( (row, index) => {
      if (index === rowIndex) {
        return {
          ...oldData[rowIndex],
          [columnID]: value
        };
      }
      return row;
    }) } )

  };

  
  let data = tableData['initialData']
  const table = useTable({ columns, data, updateData });
  
  const { headerGroups, rows, prepareRow } = table;

  // const totalPerRow = ( rows, itemPerRow ) => rows.reduce( (sum, row) => (parseFloat(sum) + parseFloat(row.values[ itemPerRow ])).toFixed(2), 0);
  const totalPerRow = ( rows, itemPerRow ) => rows.reduce( (sum, row) =>  (parseFloat(sum) + parseFloat(row.values[ itemPerRow ])), 0);
  
  
  let somaTotalRowData = {}
  somaTotalRow.map( itemPerRow => somaTotalRowData[ itemPerRow ] = totalPerRow( rows, itemPerRow ) )
  // somaTotalRow.map( itemPerRow => somaTotalRowData[ itemPerRow ] = totalPerRow( rows, itemPerRow ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) )
  // somaTotalRow.map( itemPerRow => somaTotalRowData[ itemPerRow ] = totalPerRow( rows, itemPerRow ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) )
  
  setValorTotal( somaTotalRowData['subTotal'] )


  return (
    <>
      
      <table className="tableOS">

        <thead>
          { headerGroups.map( headerGroup => (
            <tr className="tableOS__header" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map( column => (
                <th {...column.getHeaderProps()} colSpan={ column.colSpan }>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          { rows.map( row => {
            
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td data-label={ cell.column.Header } colSpan={ cell.column.colSpan }  {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}

          <tr>

            { somaTotalTextAndItens.map( cell => {
              return (
                <td colSpan={ cell.colSpan }>
                  <h5 className="tableOS__subTotal"> { cell.text } { somaTotalRowData[ cell.variable ] } </h5>                 
                </td>
              );
            })}
            
          </tr>

        </tbody>
      
      </table>

      <div className="tableOS__button--container">
        <button type="button" className="tableOS__button--add" onClick={addRow}>Adicionar Linha</button>
        <button type="button" className="tableOS__button--reset" onClick={resetData}>Resetar Tabela</button>
      </div>
    </>
  );
});


export const TableOS = ( props ) => {

  const { tableData, setTableData, setValorTotal } = props
  
  return(
    
    <>
      <ReactTable
        tableData={tableData}
        setTableData={setTableData}
        setValorTotal={setValorTotal}
      />
    </>    
    
  );
}