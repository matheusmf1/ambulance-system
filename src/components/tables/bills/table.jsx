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
import DeleteModal from "../../modal/deleteModal";


export const Table = ( props ) => {

  const { tableName, columns, data, billModalEdit, billModal, linkCadastro } = props;

  const chooseModal = ( modalName, data, installment ) => {

    let modalNames = {
      'BillPayModalEdit': <BillPayModalEdit data={data} installment={installment}/>,
      'BillPayModal': <BillPayModal data={data} installment={installment}/>,
      'BillReceiveModalEdit': <BillReceiveModalEdit data={data} installment={installment}/>,
      'BillReceiveModal': <BillReceiveModal data={data} installment={installment}/>
    }

    return modalNames[modalName]
  }

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

  const tableRows = (rowData) => {

    let { index, key } = rowData;

    let totalInstallments = key['paymentInfo']['installments']
    let installmentsData = key['paymentInfo']['installmentsData']

    let installmentsToBePaid = installmentsData.filter( data => data['paymentStatus'] !== 'paid'  )

    const installmentsRows = installmentsToBePaid.map( (data, index) => {

      let currentInstallment = data['installment']  
      let tableCell = Object.keys( columns );
      let rowData = tableCell.map( (keyD, i) => {

        if ( keyD === 'dueDate' ) {
          return <td key={i}>{ `${new Date( data['dueDate'] ).toLocaleDateString('pt-br')}` }</td>;
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
          return <td key={i}>{currentInstallment}/{totalInstallments}</td>;
        }

        if ( keyD === 'amountPay' ) {
          return <td key={i}>R$ {key['amountPay']}</td>;
        }

        if ( keyD === 'installmentAmountPay' ) {
          return <td key={i}>R$ {data['installmentAmountPay']}</td>;
        }

        if ( keyD === 'paymentType' ) {
          return <td key={i}>{data['paymentType']}</td>;
        }

        if ( keyD === 'action' ) {
          return createActionButtons( i, key, currentInstallment );
        }

        // if ( keyD === 'action' && currentInstallment === "1" ) {
        //   return createActionButtons( i, key, currentInstallment );
        // }


        // if ( keyD === 'action' && currentInstallment !== "1" ) {
        //   return <td key={i}>----</td>;
        // }
  
        if ( keyD === 'baixa' ) {
          return createDarBaixaButton( i,key, currentInstallment );
        }

        return <td key={i}>{key[keyD]}</td>;

      })

      return <tr key={index}>{rowData}</tr>

    })

    return installmentsRows;
  
  }


  const createActionButtons = ( i, rowData, installment ) => {
    
    let {id} = rowData
    return <td key={i}>
      
      {chooseModal( billModalEdit, rowData, installment )}

      <DeleteModal id={id}/>

    </td>;  
  }

  const createDarBaixaButton = ( i, rowData, installment ) => {
    return <td key={i}>
      {chooseModal( billModal, rowData, installment )}
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