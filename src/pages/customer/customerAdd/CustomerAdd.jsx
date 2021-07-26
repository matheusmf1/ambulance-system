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

            {/* <div class="form__input--fullWidth">
              <label>Product Type *</label>
      
              <div class="dropdown bootstrap-select form-control">
                <select name="type" class="selectpicker form-control" data-style="py-0">
                  <option>Standard</option>
                  <option>Combo</option>
                  <option>Digital</option>
                  <option>Service</option>
                </select>
              </div>
            </div> */}


            <div class="form__input--halfWidth">
              <label class="form__input--label">Nome *</label>
              <input class="form__input" type="text" placeholder="Nome do produto" required/>
            </div>


            <div class="form__input--halfWidth">
              <label class="form__input--label">Email</label>
              <input class="form__input" type="email" placeholder="Endereço de email"/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">Telefone *</label>
              <input class="form__input" type="text" placeholder="Número de telefone" required/>
            </div>

            <div class="form__input--halfWidth">
              <label class="form__input--label">Outras caracteristicas</label>
              <input class="form__input" type="text" placeholder="Nome do produto"/>
            </div>

            <div class="form__input--fullWidth">            
              <label class="form__input--label">Anotações Adicionais</label>
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
