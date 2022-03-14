import {React, useState} from 'react';

import InputCpfCnpj from '../../../components/inputs/input--cpfCnpj';
import InputPhoneNumber from '../../../components/inputs/input--phoneNumber'
import InputCep from '../../../components/inputs/input--cep';
import { useHistory } from "react-router-dom"
import { Supplier } from "../../../data/Supplier"


export default function SupplierAdd() {

  const [ supplierData, setSupplierData ] = useState(
    {
      id: "",
      responsable: "",
      contact: "",
      cnpj_cpf: "",
  
      cep: "",
      address: "",
      addressNumber: "",
      aditionalInformation: "",
      neighborhood: "",
      city: "",
      state: "SP",
    
      telephone: "",
      mobile: "",
      email: "",
      site: "",
  
      moreInfo: ""
    }
  )

  let history = useHistory();

  const handleInformationChange = ( id ) => ( e ) => {
    setSupplierData( { ...supplierData, [id]: e.target.value } )
  }

  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
    console.log( cep )
    
    setSupplierData( { ...supplierData, "cep": cep } );

    if ( cep.length === 8 ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( data => {
        if ( data.erro ) {
          throw new Error( "Não foi possível encontrar o CEP informado, por favor tente novamente" )
        }
        else {
          console.log( data )
          setSupplierData( { ...supplierData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
        }
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }

  }

  const handleSubmit = async ( e ) => {

    e.preventDefault();

    console.log( supplierData )

    const supplier = new Supplier( { data: supplierData } )
    const result = await supplier.addSupplierToFirebase();

    if ( result ) {
      alert( "Fornecedor cadastrado com sucesso" )
      history.push("/fornecedores")
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }
  }


  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Fornecedor</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Responsável*</label>
              <input className="form__input" type="text" placeholder="Nome do responsável" onChange={handleInformationChange('responsable')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Contato</label>
              <input className="form__input" type="text" placeholder="Nome do contato" onChange={handleInformationChange('contact')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CPF/CNPJ*</label>
              <InputCpfCnpj onChange={handleInformationChange('cnpj_cpf')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone Fixo*</label>
              <InputPhoneNumber placeholder="Informe o número de telefone" mask="(99) 9999-9999" onChange={handleInformationChange('telephone')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Telefone Celular*</label>
              <InputPhoneNumber placeholder="Informe o número de celular" mask="(99) 99999-9999" onChange={handleInformationChange('mobile')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="text" placeholder="Informe o email" onChange={handleInformationChange('email')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Site</label>
              <input className="form__input" type="text" placeholder="Endereço do site" onChange={handleInformationChange('site')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CEP*</label>
              <InputCep onChange={checkCep} />
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Endereço*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" defaultValue={supplierData['address']} onChange={handleInformationChange('address')} required/>
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
              <input className="form__input" type="text" placeholder="Informe o bairro" defaultValue={supplierData['neighborhood']} onChange={handleInformationChange('neighborhood')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Cidade*</label>
              <input className="form__input" type="text" placeholder="Informe a Cidade" defaultValue={supplierData['city']} onChange={handleInformationChange('city')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input" defaultValue={supplierData['state']} onChange={handleInformationChange('state')}>
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
              <textarea className="form__input" rows="4" onChange={handleInformationChange('moreInfo')} ></textarea>          
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