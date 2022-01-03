import React, { useState, useEffect } from 'react';

export default function EmployeeAdd() {

  const [bankData, setBankData] = useState([])

  useEffect( () => {
    fetch('https://brasilapi.com.br/api/banks/v1')
    .then( response => {
      if (response.ok)
        return response.json()
    })
    .then( data => setBankData( data.filter( item => item.name != null && item.code != null ) ) )
    .catch( error => console.error( error ))
  }, [])

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
                <select name="estados-brasil" className="form__input" required>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado Civil</label>
                <select name="estados-brasil" className="form__input" required>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="separado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">RG*</label>
              <input className="form__input" type="email" placeholder="Informe o nº do RG" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CPF*</label>
              <input className="form__input" type="email" placeholder="Informe o nº do CPF" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="email" placeholder="Endereço de email" required/>
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
                <select name="estados-brasil" className="form__input" required>
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
              <input className="form__input" type="text" placeholder="Informe o cargo" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Salário*</label>
              <input className="form__input" type="text" placeholder="Informe o valor do salário" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Vale Transporte(Total por dia)*</label>
              <input className="form__input" type="number" placeholder="Informe o valor gasto por dia" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Instituição Financeira*</label>
              <select name="estados-brasil" className="form__input" required>

              <option value="choose" selected>Escolha o banco</option>

                {
                  bankData.map( (data, key) => {
                    let valueData = `${data['code']}-${data['name']}`

                    return (<option value={data['code']} key={key}>{data['code']} - {data['name']}</option>);
                  })
                }

                </select>    
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Agência*</label>
              <input className="form__input" type="text" placeholder="Número da Agência"/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Tipo da Conta</label>
                <select name="estados-brasil" className="form__input" required>
                  <option value="corrente">Corrente</option>
                  <option value="poupanca">Poupança</option>
                  <option value="salario">Salário</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número da Conta*</label>
              <input className="form__input" type="text" placeholder="Informe o número da conta" required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Chave PIX*</label>
              <input className="form__input" type="text" placeholder="Informe o PIX" required/>
            </div>

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4"></textarea>          
            </div>

          </div>

          <div className="form__container--buttons">
            <button type="submit" className="form__button form__button--add">Adicionar</button>
            <button type="reset" className="form__button form__button--calcel">Corrigir</button>
          </div>


        </form>

      </div>

    </main>
    )
  }
