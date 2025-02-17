import React, { useState, useEffect } from 'react';

import InputCpfCnpj from '../../../components/inputs/input--cpfCnpj';
import InputPhoneNumber from '../../../components/inputs/input--phoneNumber'
import InputCep from '../../../components/inputs/input--cep';
import { useHistory } from "react-router-dom"
import { Employee } from '../../../data/Employee';

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


  const [ employeeData, setEmployeeData ] = useState(
    {
      id: "",
      name: "",
      birthday: "",
      
      gender: "masculino",
      marital_status: "solteiro",
      
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

      rg: "",
      cpf: "",
      job_role: "",
      salary:"",
      transportation_voucher: "",
      bank_number: "",
      bank_agency:"",
      bank_accountType: "",
      bank_accountNumber: "",
      bank_pix: "",
      moreInfo: "",
    } 
  )

  let history = useHistory();

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === 'birthday' ){
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setEmployeeData( { ...employeeData, [id]: `${new Date( formatedDate )}` } );
    }
    else {
      setEmployeeData( { ...employeeData, [id]: e.target.value } )
    }

  }

  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
  
    setEmployeeData( { ...employeeData, "cep": cep } );

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
          setEmployeeData( { ...employeeData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
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
    
    const employee = new Employee( { data: employeeData } );

    const result = await employee.addEmployeeToFirebase();

    if ( result ) {
      alert( "Funcionário cadastrado com sucesso" )
      history.push("/funcionarios")
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }

  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Funcionário</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome*</label>
              <input className="form__input" type="text" placeholder="Nome do funcionário" onChange={handleInformationChange('name')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Nascimento*</label>
              <input className="form__input" type="date" onChange={handleInformationChange('birthday')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Gênero*</label>
                <select name="estados-brasil" className="form__input" defaultValue={employeeData['gender']} onChange={handleInformationChange('gender')} required>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado Civil</label>
                <select name="estados-brasil" className="form__input" defaultValue={employeeData['marital_status']} onChange={handleInformationChange('marital_status')} required>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="outro">Outro</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">RG*</label>
              <input className="form__input" type="text" placeholder="Informe o nº do RG" onChange={handleInformationChange('rg')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">CPF*</label>
              <InputCpfCnpj placeholder="Informe o nº do CPF" onChange={handleInformationChange('cpf')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Email*</label>
              <input className="form__input" type="email" placeholder="Endereço de email" onChange={handleInformationChange('email')} required/>
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
              <label className="form__input--label">CEP*</label>
              <InputCep onChange={checkCep} />
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Endereço*</label>
              <input className="form__input" type="text" placeholder="Informe o endereço" defaultValue={employeeData['address']} onChange={handleInformationChange('address')} required/>
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
              <input className="form__input" type="text" placeholder="Informe o bairro" defaultValue={employeeData['neighborhood']} onChange={handleInformationChange('neighborhood')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Cidade*</label>
              <input className="form__input" type="text" placeholder="Informe a Cidade" defaultValue={employeeData['city']} onChange={handleInformationChange('city')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input" defaultValue={employeeData['state']} onChange={handleInformationChange('state')}>
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



            <div className="form__input--halfWidth">
              <label className="form__input--label">Cargo*</label>
              <input className="form__input" type="text" placeholder="Informe o cargo" onChange={handleInformationChange('job_role')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Salário*</label>
              <input className="form__input" type="text" placeholder="Informe o valor do salário" onChange={handleInformationChange('salary')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Vale Transporte(Total por dia)*</label>
              <input className="form__input" type="number" min="1" step=".01" placeholder="Informe o valor gasto por dia" onChange={handleInformationChange('transportation_voucher')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Instituição Financeira*</label>
              <select name="estados-brasil" className="form__input" defaultValue="choose" onChange={handleInformationChange('bank_number')} required>
              <option value="choose">Escolha o banco</option>

                {
                  bankData.map( (data, key) => {
                    return (<option value={data['code']} key={key}>{data['code']} - {data['name']}</option>);
                  })
                }

                </select>    
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Agência*</label>
              <input className="form__input" type="text" placeholder="Número da Agência" onChange={handleInformationChange('bank_agency')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Tipo da Conta</label>
                <select name="estados-brasil" className="form__input" defaultValue="choose" onChange={handleInformationChange('bank_accountType')} required>
                  <option value="choose">Escolha o tipo da Conta</option>
                  <option value="corrente">Corrente</option>
                  <option value="poupanca">Poupança</option>
                  <option value="salario">Salário</option>
                </select>              
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número da Conta*</label>
              <input className="form__input" type="text" placeholder="Informe o número da conta" onChange={handleInformationChange('bank_accountNumber')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Chave PIX*</label>
              <input className="form__input" type="text" placeholder="Informe o PIX" onChange={handleInformationChange('bank_pix')} required/>
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
