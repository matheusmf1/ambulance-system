import React from 'react'

import '../../customer/customerAdd/customerAdd.css'

export default function NewBillToPay() {
  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Contas a Pagar</h4>
      </div>

      <div className="form__content">
        <form action="page-list-product.html">
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome da Empresa*</label>
              <input className="form__input" type="text" placeholder="Nome da empresa" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Fornecedor</label>
              <input className="form__input" type="text" placeholder="CAMPO PARA BUSCAR O FORNECEDOR"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Vencimento*</label>
              <input className="form__input" type="date" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor da Conta*</label>
              <input className="form__input" type="number" placeholder="Informe o valor da conta" required/>
            </div>


            <div className="form__input--halfWidth">
            <label className="form__input--label">Formas de Pagamento*</label>
                <select name="forma-pagamento" className="form__input">
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
              <input className="form__input" type="text" placeholder="Informe o nº do documento"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Arquivo</label>
              <input className="form__input" type="file" placeholder="Arquivo"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Parcelas</label>
              <input className="form__input" type="text" placeholder="Se houver informe o nº de parcelas"/>
            </div>

            <div className="form__input--halfWidth">
            <label className="form__input--label">Tipo Despesa*</label>
                <select name="forma-pagamento" className="form__input">
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
              <textarea className="form__input" rows="4"></textarea>          
            </div>

          </div>

          <button type="submit" className="form__button form__button--add">Adicionar</button>
          <button type="reset" className="form__button form__button--calcel">Corrigir</button>

        </form>

      </div>
      
    </main>
    )
  }
