import React, { useState } from 'react'
import { TablePaidReceivedBill } from '../../../components/tables/bills/tablePaidReceivedBill';
import { tableBillToPay } from "../../../assets/mock/tableBillToPay";

export default function BillReceivedList() {

  const tableColumns = {
    name: "Empresa/Fornecedor",
    service: "Serviço",
    dueDate: "Vencimento",
    installments: "Parcelas",
    amountPay: "Valor Total",
    installmentAmountPay: "Valor da Parcela",
    paymentType: "Pagamento",
    action: "Opções",
  };

  const tableBillReceiveData = tableBillToPay.filter( bill => bill.billType === "receive" )

  const billHasReceivedInstallment = tableBillReceiveData.map( bill => { 

    let array = bill['paymentInfo']['installmentsData'].filter( installmentinfo => installmentinfo.paymentStatus === "received" )
    return array.length > 0 ? bill : 0
    })

  const tableData = billHasReceivedInstallment.filter( data => data !== 0 )

  return (
    <>
      <TablePaidReceivedBill
        tableName="Contas Recebidas"
        columns={tableColumns}
        data={tableData}
        billPaymentStatus="toReceive"
        billInfoLink="/financeiro/recebidos"
        linkCadastro="/financeiro/receber/cadastro"
      />  
    </>
  )
}
