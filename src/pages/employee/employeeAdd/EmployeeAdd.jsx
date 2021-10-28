import React from 'react'

export default function EmployeeAdd() {
  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Funcionário</h4>
      </div>

      <div className="form__content">
        <form action="page-list-product.html">
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome*</label>
              <input className="form__input" type="text" placeholder="Nome do funcionário" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Nascimento*</label>
              <input className="form__input" type="date" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Gênero*</label>
                <select name="estados-brasil" className="form__input">
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado Civil</label>
                <select name="estados-brasil" className="form__input">
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="separado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">RG*</label>
              <input className="form__input" type="email" placeholder="Informe o nº do RG"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CPF*</label>
              <input className="form__input" type="email" placeholder="Informe o nº do CPF"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="email" placeholder="Endereço de email"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone*</label>
              <input className="form__input" type="text" placeholder="Número de telefone" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Celular*</label>
              <input className="form__input" type="text" placeholder="Número de celular" required/>
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


            <div className="form__input--halfWidth">
              <label className="form__input--label">Cargo*</label>
              <input className="form__input" type="email" placeholder="Informe o cargo"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Salário*</label>
              <input className="form__input" type="email" placeholder="Informe o valor do salário"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Vale Transporte(Total por dia)*</label>
              <input className="form__input" type="email" placeholder="Informe o valor gasto por dia"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Dados Bancários*</label>
              <input className="form__input" type="email" placeholder="Dados Bancários"/>
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
