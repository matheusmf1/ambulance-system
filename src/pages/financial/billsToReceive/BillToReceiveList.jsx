import React, { useState } from 'react'
import { Table } from '../../../components/tables/bills/table';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

export default function BillToPayList() {

  const tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    amountPay: "Valor",
    paymentType: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções",
  };


  const editarModal = "BillReceiveModalEdit"
  const darBaixaModal = "BillReceiveModal"

  return (
    <>
      <Table
        tableName="Contas a Receber"
        columns={tableColumns}
        data={tableBillToPay}
        billModalEdit={editarModal}
        billModal={darBaixaModal}
        linkCadastro="/financeiro/receber/cadastro"
        
      />  
    </>
  )
}
