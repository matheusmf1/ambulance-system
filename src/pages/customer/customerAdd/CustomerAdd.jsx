import React from 'react'

import './customerAdd.css'

export default function CustomerAdd() {
  return (
  
    <main class="form__container">

      <div class="form__title">
        <h4>Cadastrar Cliente</h4>
      </div>

      <div class="form__content">
        <form action="page-list-product.html">
          <div class="form__content--inputs">

            <div class="form__input--halfWidth">
              <label class="form__input--label">Cliente*</label>
              <input class="form__input" type="text" placeholder="Nome do responsável" required/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">Empresa*</label>
              <input class="form__input" type="text" placeholder="Nome da empresa" required/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">CNPJ/CPF*</label>
              <input class="form__input" type="text" placeholder="Informe o CNPJ ou CPF" required/>
            </div>


            <div class="form__input--halfWidth">
              <label class="form__input--label">Endereço*</label>
              <input class="form__input" type="text" placeholder="Informe o endereço" required/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">Cidade*</label>
              <input class="form__input" type="text" placeholder="Informe o endereço" required/>
            </div>

            {/* <div class="form__input--halfWidth">
              <label class="form__input--label">Estado*</label>
              <input class="form__input" type="text" placeholder="Informe o endereço" required/>
            </div> */}

            <div class="form__input--halfWidth">
              <label class="form__input--label">Estado*</label>
    
                  <select name="estados-brasil" class="form__input">
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
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>              
            </div>


            <div class="form__input--halfWidth">
              <label class="form__input--label">Email*</label>
              <input class="form__input" type="email" placeholder="Endereço de email"/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">Telefone*</label>
              <input class="form__input" type="text" placeholder="Número de telefone" required/>
            </div>

            <div class="form__input--fullWidth">            
              <label class="form__input--label">Informações adicionais</label>
              <textarea class="form__input" rows="4"></textarea>          
            </div>

          </div>

          <button type="submit" class="form__button form__button--add">Adicionar</button>
          <button type="reset" class="form__button form__button--calcel">Corrigir</button>

        </form>

      </div>

    </main>
    )
  }
