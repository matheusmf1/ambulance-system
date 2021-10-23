import React from "react";

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
  return <h5 onChange={onChange}>R$ {cell.value}</h5>;
};

const ReactTable2 = React.memo( props => {

  // console.log("ReactTable2", props);
  // const { setAmountDue, setQuantidade } = props;

  const columns = React.useMemo(
    () => [

      {
        Header: "Item",
        accessor: "item",
        Cell: TableInputText
      },

      {
        Header: "Código",
        accessor: "codigo",
        Cell: TableInputText
      },

      {
        Header: "Nome",
        accessor: "nome",
        Cell: TableInputText
      },

      {
        Header: "UND.",
        accessor: "unidade",
        Cell: TableInputText
      },

      {
        Header: "QTD.",
        accessor: "quantidade",
        Cell: TableInputNumber
      },

      {
        Header: "VR. UNIT.",
        accessor: "valorUnitario",
        Cell: TableInputNumber
      },

      {
        Header: "SubTotal",
        accessor: row => row.valorUnitario * row.quantidade,
        Cell: TableText,
        id: "subTotal",
      }
    ],
    []
  );

  const initialData = [
    {
      item: 1,
      codigo: '',
      nome: '',
      unidade: '',
      valorUnitario: 0,
      quantidade: 1
    }
  ];


  const [data, setData] = React.useState(initialData);
  const resetData = () => setData(initialData);

  // const addRow = () => setData( old => [...old, ...initialData ]);
  const addRow = () => setData( old => [...old, 
    { 
      item: old[ old.length -1 ].item + 1, 
      codigo: '',
      nome: '',
      unidade: '',
      valorUnitario: 0,
      quantidade: 1  
    } 
  ]);

  const updateData = (rowIndex, columnID, value) => {

    setData( oldData => oldData.map( (row, index) => {
      if (index === rowIndex) {
        return {
          ...oldData[rowIndex],
          [columnID]: value
        };
      }
      return row;
    }));

  };


  const table = useTable({ columns, data, updateData });
  
  const { headerGroups, rows, prepareRow } = table;

  const tableSum = rows.reduce( (sum, row) => sum + row.values.subTotal, 0);

  const quantidadeSum = rows.reduce( (sum, row) => parseInt(sum) + parseInt(row.values.quantidade), 0);

  // setAmountDue(tableSum);
  // setQuantidade(quantidadeSum);

  return (
    <>
      
      <table className="tableOS">

        <thead>
          { headerGroups.map( headerGroup => (
            <tr className="tableOS__header" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map( column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                  <td data-label={ cell.column.Header }  {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}

          <tr>
            
            <td colSpan={4}>
              <h5>Total de Produtos</h5>
            </td>
          
            <td colSpan={1} data-label="QTD.">
              <h5>{quantidadeSum}</h5>
            </td>

            <td colSpan={1}> 
            </td>

            <td colSpan={1} data-label="Subtotal">
              <h5>R$ {tableSum}</h5>
            </td>

          </tr>

        </tbody>
      
      </table>

      <div>
        <button type="button" onClick={addRow}>Adicionar Linha</button>
        <button type="button" onClick={resetData}>Resetar Tabela</button>
      </div>
    </>
  );
});

const ReactTable = React.memo( props => {

  // console.log("ReactTable Props", props);

  const { initialData, somaTotalRow, setValorTotal, somaTotalTextAndItens } = props;

  const tableColumns = props.columns

  tableColumns.forEach( item => {
    item['Cell'] = eval( item[ 'Cell' ] )
  });


  const columns = React.useMemo( () => tableColumns, [tableColumns] );

  const [data, setData] = React.useState(initialData);
  const resetData = () => setData(initialData);

  const updateItemNumberAddRow = ( old ) => {

    let lastData = old[ old.length -1 ].item;
    let objKeys = Object.keys( initialData[0] )
    let newData = {}

    objKeys.forEach( key => {

      if (key === 'item') {
        newData[ key ] = lastData + 1
      }

      else {
        newData[ key ] = initialData[0][ key ]        
      }
    })

    return newData
  }

  const addRow = () => setData( old => [...old, updateItemNumberAddRow( old )] )

  const updateData = (rowIndex, columnID, value) => {

    setData( oldData => oldData.map( (row, index) => {
      if (index === rowIndex) {
        return {
          ...oldData[rowIndex],
          [columnID]: value
        };
      }
      return row;
    }));

  };


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
                <th {...column.getHeaderProps()} colspan={ column.colSpan }>{column.render("Header")}</th>
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
                  <td data-label={ cell.column.Header } colspan={ cell.column.colSpan }  {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}

          <tr>

            { somaTotalTextAndItens.map( cell => {
              return (
                <td colSpan={ cell.colSpan }>
                  <h5> { cell.text } { somaTotalRowData[ cell.variable ] } </h5>                 
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


export const TableO2 = () => {

  // const [amountDue, setAmountDue ] = React.useState(0);
  // const [totalQuantidade, setQuantidade] = React.useState(0);
  
  return(
    
    <>
      {/* <ReactTable setAmountDue={setAmountDue} setQuantidade={setQuantidade} /> */}
      <ReactTable2 />
      {/* <section>
        <h2>Total: {amountDue}</h2>
        <h2>Total Uni: {totalQuantidade}</h2>
      </section> */}
    </>    
    
  );
}


export const TableOS = ( props ) => {

  const { tableData, setValorTotal } = props
  const { columns, initialData, somaTotalRow, somaTotalTextAndItens } = tableData
  
  return(
    
    <>
      <ReactTable 
        columns={columns} 
        initialData={initialData}
        somaTotalRow={somaTotalRow}
        setValorTotal={setValorTotal}
        somaTotalTextAndItens={somaTotalTextAndItens}
      />
    </>    
    
  );
}