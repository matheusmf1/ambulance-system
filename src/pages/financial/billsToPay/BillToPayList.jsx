import React from 'react'
import { Table } from '../../../components/tables/bills/table';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

export default function BillToPayList() {

  const tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    baixa: "Dar Baixa",
    action: "Opções",
  };


  const editarModal = "BillPayModalEdit"
  const darBaixaModal = "BillPayModal"

  const tableData = tableBillToPay.filter( bill => bill.billType === "pay" )

  return (
    <>
      <Table
        tableName="Contas a Pagar"
        columns={tableColumns}
        data={tableData}
        billPaymentStatus="toPay"
        billModalEdit={editarModal}
        billModal={darBaixaModal}
        linkCadastro="/financeiro/pagar/cadastro"
      />  
    </>
  )
}
