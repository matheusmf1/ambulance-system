import React, { useState } from 'react'
import { Table } from '../../../components/tables/bills/table';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

export default function BillToReceiveList() {

  const tableColumns = {
    name: "Empresa/Fornecedor",
    service: "Serviço",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções",
  };


  const editarModal = "BillReceiveModalEdit"
  const darBaixaModal = "BillReceiveModal"

  const tableData = tableBillToPay.filter( bill => bill.billType === "receive" )

  return (
    <>
      <Table
        tableName="Contas a Receber"
        columns={tableColumns}
        data={tableData}
        billPaymentStatus="toReceive"
        billModalEdit={editarModal}
        billModal={darBaixaModal}
        linkCadastro="/financeiro/receber/cadastro"
      />  
    </>
  )
}
