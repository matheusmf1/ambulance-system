import React, {useState} from "react";

import '../../customer/customerAdd/customerAdd.css';
import { Bill } from "../../../data/Bill";
import { useHistory } from "react-router-dom";

export default function NewBillToReceive() {

  const history = useHistory();

  const [ hasInstallment, setHasInstallment ] = useState(false)

  const [ installment, setInstallment ] = useState(
    {
      installmentAmountPay: "",
      dueDate: '',          
      receiptFile: "",
      paymentDate: "",
      amountPaid: "",
      paymentType: "boleto",
      installment: "1",
      paymentStatus: "toReceive"
    }
  )

  const [ data, setData ] = useState( {
    id: "",
    name: "",
    billType: "receive",
    documentNumber: "",
    billFile: "",
    additionalInformation: "",
    amountPay: "",
    
    paymentInfo: {
      installments: "1",
      installmentsData: []
    },
    
    service: "",
    serviceNumber: ""
  } )

  const handleOnChangeInformation = (id) => (e) => {
    
    if ( id === 'dueDate' ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setInstallment( { ...installment, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'amountPay' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setData( { ...data, [id]: amount } );
    }

    else if ( id === 'paymentType' ) {
      setInstallment( { ...installment, [id]: e.target.value } );
    }

    else if ( id === 'installments' ) {
      let paymentInfo = {
        installments: `${e.target.value}`,
        installmentsData: [] 
      }

      setData( { ...data, 'paymentInfo': paymentInfo } )
    }

    else{
      setData( { ...data, [id]: e.target.value } );
    }


  }

  const unifyData = () => {

    const totalInstallments = parseInt( data['paymentInfo']['installments'] )
    let installmentAmountPay = 0
    if ( totalInstallments !== 0 ) {
      installmentAmountPay = parseFloat( data['amountPay'] / totalInstallments ).toFixed(3).slice(0, -1)
    }

    const installmentDataArray = []
    for ( let i = 0; i < totalInstallments; i++ ) {
      
      let installmentBody = {
        installmentAmountPay: `${ installmentAmountPay }`,
        dueDate: '',          
        receiptFile: '',
        paymentDate: '',
        amountPaid: "",
        paymentType: `${installment['paymentType']}`,
        installment: `${i + 1}`,
        paymentStatus: "toReceive"
      }
    
      let date = new Date( installment['dueDate'] )
      let day = parseInt(date.getDate())
      let month = parseInt(date.getMonth()) + 1
      let year = parseInt(date.getFullYear())
  
      let correntInstallmentMonth = month + i
    
      if ( correntInstallmentMonth > 12 ) {
        correntInstallmentMonth = correntInstallmentMonth - 12
        year = year + 1
      }

      let lastDayCurrentInstallmentMonth = new Date( year, correntInstallmentMonth, 0).getDate();

      if ( day > lastDayCurrentInstallmentMonth ) {
        day = lastDayCurrentInstallmentMonth
      }

      let installmentDate = new Date(`${year}/${correntInstallmentMonth}/${day}`)
      installmentBody['dueDate'] = `${installmentDate}`
      installmentDataArray.push( installmentBody )
    }

    let paymentInfo = {
      installments: `${totalInstallments}`,
      installmentsData: installmentDataArray
    }

    data['paymentInfo'] = paymentInfo
    return data

  }

  const handleAddInformation = async ( e ) => {
    e.preventDefault()

    const finalData = unifyData()
    const bill = new Bill( { data: finalData, billType: finalData['billType'] } );

    const result = await bill.addBillToFirebase();

    if ( result ) {
      alert( "Conta a ser recebida cadastrada com sucesso" )
      history.push("/financeiro/receber")
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }
  }


  const installmentElements = () => setHasInstallment( !hasInstallment )

  const renderInstallment = () => {
    if ( hasInstallment ){

      let totalAmount = data['amountPay']
      if ( isNaN(totalAmount) ) {
        totalAmount = 0
      }
      
      let installmentsNumber = data[ 'paymentInfo']['installments']
      let amountPerInstallment = parseFloat( 0 ).toFixed(3).slice(0, -1)
      if ( installmentsNumber > 0 ) {
        amountPerInstallment = parseFloat( totalAmount / installmentsNumber ).toFixed(3).slice(0, -1)
      }

      return(
        <>
          <div className="form__input--halfWidth">
            <label className="form__input--label"> Número de Parcelas no valor de R$ { amountPerInstallment }</label>
            <input className="form__input" type="number" required placeholder="Informe o nº de parcelas" min="1" onChange={handleOnChangeInformation('installments')}/>
          </div>
        </>
        );
    }
    else {
      return <></>
    }
  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Contas a Receber</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleAddInformation}>
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome da Empresa*</label>
              <input className="form__input" type="text" placeholder="Nome da empresa" onChange={handleOnChangeInformation('name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Cliente</label>
              <input className="form__input" type="text" placeholder="CAMPO PARA BUSCAR O CLIENTE"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Vencimento*</label>
              <input className="form__input" type="date" required onChange={handleOnChangeInformation('dueDate')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor da Conta*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor da conta" required onChange={handleOnChangeInformation('amountPay')}/>
            </div>


            <div className="form__input--halfWidth">
            <label className="form__input--label">Formas de Pagamento*</label>
            <select name="forma-pagamento" className="form__input" defaultValue={installment.paymentType} onChange={handleOnChangeInformation('paymentType')}>
                  <option value="boleto">Boleto</option>
                  <option value="cheque">Cheque</option>
                  <option value="deposito">Depósito</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>   
                </select>  
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Serviço*</label>
              <select name="forma-pagamento" className="form__input" onChange={handleOnChangeInformation('service')}>
                <option value="transformationProposal">Proposta</option>
                <option value="serviceOrder">Ordem de Serviço</option>
                <option value="productSale">Venda de Produto</option>
              </select>  
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número do Serviço</label>
              <input className="form__input" type="text" placeholder="Informe o nº do documento" onChange={handleOnChangeInformation('serviceNumber')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Arquivo</label>
              <input className="form__input" type="file" placeholder="Arquivo" onChange={handleOnChangeInformation('billFile')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Parcelas</label>
              <select name="forma-pagamento" className="form__input" defaultValue="nao" onChange={installmentElements} >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>  
            </div>

            { renderInstallment() }


            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleOnChangeInformation('additionalInformation')}/>
            </div>

          </div>
          
          <div className="form__container--buttons">
            {/* <button className="form__button form__button--add" onClick={handleAddInformation}>Adicionar</button> */}
            <button className="form__button form__button--add">Adicionar</button>
            <button type="reset" className="form__button form__button--calcel">Corrigir</button>
          </div>
        </form>

      </div>
      
    </main>
    )
  }
