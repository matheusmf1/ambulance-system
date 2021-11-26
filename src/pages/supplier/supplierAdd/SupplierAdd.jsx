import React from 'react'

export default function SupplierAdd() {
  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Fornecedor</h4>
      </div>

      <div className="form__content">
        <form action="page-list-product.html">
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Responsável*</label>
              <input className="form__input" type="text" placeholder="Nome do responsável" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Contato</label>
              <input className="form__input" type="text" placeholder="Nome do contato"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CNPJ/CPF*</label>
              <input className="form__input" type="text" placeholder="Informe o CNPJ ou CPF" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone</label>
              <input className="form__input" type="text" placeholder="Número de telefone"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Celular*</label>
              <input className="form__input" type="text" placeholder="Número de celular" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="text" placeholder="Informe o email" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Site</label>
              <input className="form__input" type="text" placeholder="Endereço do site"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CEP*</label>
              <input className="form__input" type="text" placeholder="Informe o CEP" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Endereço*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" required/>
            </div>


            <div className="form__input--halfWidth">
              <label className="form__input--label">Número*</label>
              <input className="form__input" type="text" placeholder="Informe o número" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Complemento</label>
              <input className="form__input" type="text" placeholder="Apartamento, sala, edifício, andar, etc."/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Bairro*</label>
              <input className="form__input" type="text" placeholder="Informe o bairro" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Cidade*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input">
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP" selected>São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
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
