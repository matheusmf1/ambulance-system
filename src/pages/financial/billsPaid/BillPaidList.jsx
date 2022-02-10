import React from 'react'
import { TablePaidReceivedBill } from '../../../components/tables/bills/tablePaidReceivedBill';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

export default function BillPaidList() {

  const tableColumns = {
    name: "Empresa/Fornecedor",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    action: "Opções",
  };

  const tableBillPayData = tableBillToPay.filter( bill => bill.billType === "pay" )

  const billHasPaidInstallment = tableBillPayData.map( bill => { 

    let array = bill['paymentInfo']['installmentsData'].filter( installmentinfo => installmentinfo.paymentStatus === "paid" )
    return array.length > 0 ? bill : 0
    })

  const tableData = billHasPaidInstallment.filter( data => data !== 0 )

  return (
    <>
      <TablePaidReceivedBill
        tableName="Contas Pagas"
        columns={tableColumns}
        data={tableData}
        billPaymentStatus="toPay"
        billInfoLink="/financeiro/pagas"
        linkCadastro="/financeiro/pagar/cadastro"
      />  
    </>
  )
}
