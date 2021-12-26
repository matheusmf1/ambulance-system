import React, { useState } from 'react'
import { Table } from '../../../components/tables/bills/table';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

import BillModal from "../../../components/modal/bill/BillModal"

export default function BillToPayList() {

  const tableColumns = {
    name: "Empresa",
    vencimento: "Vencimento",
    valor: "Valor",
    pagamento: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções",
  };


  const editarModal = <BillModal/>
  const darBaixaModal = <BillModal/>

  return (
    <>
      <Table
        tableName="Contas a Pagar"
        columns={tableColumns}
        data={tableBillToPay}
        editModal={editarModal}
        baixaModal={darBaixaModal}
      />  
    </>
  )
}
