import React from 'react'
import './formCustomer.css'

export default function FormCustomer() {
  return (
    <section className="form__container">

    <div className="form__title">
      <h4>Cadastrar Cliente</h4>
    </div>

    <div className="form__content">
      <form action="page-list-product.html">
        <div className="form__content--inputs">

          <div className="form__input--fullWidth">
            <label>Product Type *</label>
    
            {/* <div className="dropdown bootstrap-select form-control">
              <select name="type" className="selectpicker form-control" data-style="py-0">
                <option>Standard</option>
                <option>Combo</option>
                <option>Digital</option>
                <option>Service</option>
              </select>
            </div> */}

          </div>


          <div className="form__input--halfWidth">
            <label className="form__input--label">Nome *</label>
            <input className="form__input" type="text" placeholder="Nome do produto" required/>
          </div>


          <div className="form__input--halfWidth">
            <label className="form__input--label">Email</label>
            <input className="form__input" type="email" placeholder="Endereço de email"/>
          </div>

          <div className="form__input--halfWidth">
            <label className="form__input--label">Telefone *</label>
            <input className="form__input" type="text" placeholder="Número de telefone" required/>
          </div>

          <div className="form__input--halfWidth">
            <label className="form__input--label">Outras caracteristicas</label>
            <input className="form__input" type="text" placeholder="Nome do produto"/>
          </div>


          <div className="form__input--fullWidth">            
            <label className="form__input--label">Anotações Adicionais</label>
            <textarea className="form__input" rows="4"></textarea>          
          </div>

        </div>

        <button type="submit" className="form__button form__button--add">Adicionar</button>
        <button type="reset" className="form__button form__button--calcel">Corrigir</button>

      </form>

    </div>

  </section>
  )
}
