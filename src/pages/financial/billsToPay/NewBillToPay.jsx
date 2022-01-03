import React, {useState} from "react";

import '../../customer/customerAdd/customerAdd.css'

export default function NewBillToPay() {

  const [ data, setData ] = useState( {
    id: "",
    billType: "pay",
    documentNumber: "",
    installments: "",
    service: "",
    serviceNumber: "",
    billFile: "",

    name: "",
    dueDate: "",
    amountPay: "",
    expenseType: "",
    paymentDate: "",
    amountPaid: "",
    receiptFile: "",
    paymentType: "",
    additionalInformation: "",
  } )

  const handleOnChangeInformation = (id) => (e) => {

    if ( id === 'dueDate') {
      setData( { ...data, [id]: `${new Date( e.target.value )}` } );
    }
    else {
      setData( { ...data, [id]: e.target.value } );
    }

  }

  const handleAddInformation = ( e ) => {
    e.preventDefault()
    console.log( data )
  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Contas a Pagar</h4>
      </div>

      <div className="form__content">
        <form>
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome da Empresa*</label>
              <input className="form__input" type="text" placeholder="Nome da empresa" onChange={handleOnChangeInformation('name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Fornecedor</label>
              <input className="form__input" type="text" placeholder="CAMPO PARA BUSCAR O FORNECEDOR"/>
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
                <select name="forma-pagamento" className="form__input" onChange={handleOnChangeInformation('paymentType')}>
                  <option value="Boleto">Boleto</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Depósito">Depósito</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="PIX">PIX</option>
                  <option value="Transferência">Transferência</option>   
                </select>  
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número do Documento</label>
              <input className="form__input" type="text" placeholder="Informe o nº do documento" onChange={handleOnChangeInformation('documentNumber')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Arquivo da conta</label>
              <input className="form__input" type="file" placeholder="Arquivo" onChange={handleOnChangeInformation('billFile')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Parcelas</label>
              <input className="form__input" type="text" placeholder="Se houver informe o nº de parcelas" onChange={handleOnChangeInformation('installments')}/>
            </div>

            <div className="form__input--halfWidth">
            <label className="form__input--label">Tipo de Despesa*</label>
                <select name="forma-pagamento" className="form__input" onChange={handleOnChangeInformation('expenseType')}>
                  <option value="fixa">Fixa</option>
                  <option value="folhaPagamento">Folha de Pagamento</option>
                  <option value="impostos">Impostos</option>
                  <option value="bancaria">Bancária</option>
                  <option value="produto">Produto</option>
                  <option value="serviço">Serviço</option>   
                  <option value="alimentacao">Alimentação</option>   
                </select>  
            </div>

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleOnChangeInformation('additionalInformation')}></textarea>          
            </div>

          </div>

          <div className="form__container--buttons">
            <button className="form__button form__button--add" onClick={handleAddInformation}>Adicionar</button>
            <button type="reset" className="form__button form__button--calcel">Corrigir</button>
          </div>

        </form>

      </div>
      
    </main>
    )
  }
