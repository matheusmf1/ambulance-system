import {React, useState} from 'react'

import './customerAdd.css'

export default function CustomerAdd() {

  const [customerData, setCustomerData] = useState(
    {
      id: "",
      responsable: "",
      contact: "",
      corporate_name: "",
      fantasy_name: "",
      cnpj_cpf: "",
      email: "",
      telephone: "",
      mobile: "",
      cep: "",
      address: "",
      addressNumber: "",
      aditionalInformation: "",
      neighborhood: "",
      city: "",
      state: "SP",
      moreInfo: "",
    },
  );

  const handleInformationChange = ( id ) => ( e ) => {
    setCustomerData( { ...customerData, [id]: e.target.value } )
  }

  const handleSubmit = ( e ) => {

    e.preventDefault();

    console.log( customerData ) 
  }
  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Cliente</h4>
      </div>

      <div className="form__content">
        <form action="/clientes" onSubmit={handleSubmit}>

          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Resposável*</label>
              <input className="form__input" type="text" placeholder="Nome do responsável" onChange={handleInformationChange('responsable')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Contato</label>
              <input className="form__input" type="text" placeholder="Nome do contato" onChange={handleInformationChange('contact')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Razão Social*</label>
              <input className="form__input" type="text" placeholder="Razão social" onChange={handleInformationChange('corporate_name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome Fantasia*</label>
              <input className="form__input" type="text" placeholder="Nome fantasia" onChange={handleInformationChange('fantasy_name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CNPJ/CPF*</label>
              <input className="form__input" type="text" placeholder="Informe o CNPJ ou CPF" onChange={handleInformationChange('cnpj_cpf')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="email" placeholder="Endereço de email" onChange={handleInformationChange('email')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone Fixo*</label>
              <input className="form__input" type="text" placeholder="Número de telefone" onChange={handleInformationChange('telephone')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone Celular*</label>
              <input className="form__input" type="text" placeholder="Número de celular" onChange={handleInformationChange('mobile')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CEP*</label>
              <input className="form__input" type="text" placeholder="Informe o CEP" onChange={handleInformationChange('cep')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Endereço*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" onChange={handleInformationChange('address')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número*</label>
              <input className="form__input" type="text" placeholder="Informe o número" onChange={handleInformationChange('addressNumber')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Complemento</label>
              <input className="form__input" type="text" placeholder="Apartamento, sala, edifício, andar, etc." onChange={handleInformationChange('aditionalInformation')} />
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Bairro*</label>
              <input className="form__input" type="text" placeholder="Informe o bairro" onChange={handleInformationChange('neighborhood')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Cidade*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" onChange={handleInformationChange('city')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input" defaultValue={customerData['state']} onChange={handleInformationChange('state')}>
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

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleInformationChange('moreInfo')}></textarea>          
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
