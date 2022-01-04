export const tableBillToPay = [
  {
    id: "1",
    name: "Vivo",
    billType: "pay",
    documentNumber: "123 doc",
    billFile: "file",
    additionalInformation: "hello",
    expenseType: "impostos",
    amountPay: "50",

    paymentInfo: {
      installments: "2",
      installmentsData: [
        {
          installmentAmountPay: "25",
          dueDate: 'Mon Jan 10 2022 10:20:14 GMT-0300 (Horário Padrão de Brasília)',          
          receiptFile: "",
          paymentDate: "",
          amountPaid: "",
          paymentType: "boleto",
          installment: "1",
          paymentStatus: "paid",
          // paymentStatus: "toPay"
        },
        {
          installmentAmountPay: "25",
          dueDate: 'Thu Feb 10 2022 10:20:14 GMT-0300 (Horário Padrão de Brasília)',
          receiptFile: "",
          paymentDate: "",
          amountPaid: "",
          paymentType: "boleto",
          installment: "2",
          // paymentStatus: "paid",
          paymentStatus: "toPay"
        }
      ]
      
    },
    
    service: "VAZIO EM PAY",
    serviceNumber: "VAZIO EM PAY"
  },

  {
    id: "2",
    name: "NET",
    billType: "pay",
    documentNumber: "net doc number",
    billFile: "file",
    additionalInformation: "Net",
    expenseType: "impostos",
    amountPay: "250",

    paymentInfo: {
      installments: "2",
      installmentsData: [
        {
          installmentAmountPay: "125",
          dueDate: 'Mon Jan 10 2022 10:20:14 GMT-0300 (Horário Padrão de Brasília)',          
          receiptFile: "",
          paymentDate: "",
          amountPaid: "",
          paymentType: "boleto",
          installment: "1",
          // paymentStatus: "paid",
          paymentStatus: "toPay"
        },
        {
          installmentAmountPay: "125",
          dueDate: 'Thu Feb 10 2022 10:20:14 GMT-0300 (Horário Padrão de Brasília)',
          receiptFile: "",
          paymentDate: "",
          amountPaid: "",
          paymentType: "boleto",
          installment: "2",
          paymentStatus: "toPay"
        }
      ]
      
    },
    
    service: "VAZIO EM PAY",
    serviceNumber: "VAZIO EM PAY"
  },

];
