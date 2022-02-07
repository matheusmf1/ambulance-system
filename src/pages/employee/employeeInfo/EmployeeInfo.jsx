import { React, useState, useEffect } from 'react'
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
} from "@material-ui/icons";

import BusinessIcon from '@material-ui/icons/Business';
import userImage from '../../../assets/images/user.png'
import { tableEmployeeData } from '../../../assets/mock/tableEmployeeData';

const fetchUserData = ( id ) => {
  return tableEmployeeData.filter( user => user.id === id )[0] 
}

export default function EmployeeInfo( props ) {

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )

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

  const [ employeeData, setEmployeeData ] = useState({
    id: `${userData['id']}`,
    name: `${userData['name']}`,
    birthday: `${userData['birthday']}`,
    
    gender: `${userData['gender']}`,
    marital_status: `${userData['marital_status']}`,

    cep: `${userData['cep']}`,
    address: `${userData['address']}`,
    addressNumber: `${userData['addressNumber']}`,
    aditionalInformation: `${userData['aditionalInformation']}`,
    neighborhood: `${userData['neighborhood']}`,
    city: `${userData['city']}`,
    state: `${userData['state']}`,
  
    telephone: `${userData['telephone']}`,
    mobile: `${userData['mobile']}`,
    email: `${userData['email']}`,

    rg: `${userData['rg']}`,
    cpf: `${userData['cpf']}`,
    job_role: `${userData['job_role']}`,
    salary:`${userData['salary']}`,
    transportation_voucher: `${userData['transportation_voucher']}`,
    bank_number: `${userData['bank_number']}`,
    bank_agency:`${userData['bank_agency']}`,
    bank_accountType: `${userData['bank_accountType']}`,
    bank_accountNumber: `${userData['bank_accountNumber']}`,
    bank_pix: `${userData['bank_pix']}`,
    moreInfo: `${userData['moreInfo']}`,
  })

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

    if ( cep ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( data => {
        console.log( data )
        setEmployeeData( { ...employeeData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }

  }

  const handleSubmit = ( e ) => {
    
    e.preventDefault();
    
    console.log( employeeData ) 
  }

  const infoMap = {

    masculino:"Masculino",
    feminino:"Feminino",
    outro:"Outro",

    corrente:"Corrente",
    poupanca:"Poupança",
    salario:"Salário",

    solteiro:"Solteiro(a)",
    casado:"Casado(a)",
    divorciado:"Divorciado(a)",
    viuvo:"Viúvo(a)",
  }

  const financialInstitution = ( bankNumber ) => {
    let data = bankData.filter( bank => bank.code === parseInt(bankNumber))[0]

    if ( data ){
      return `${data['code']} - ${data['name']}`
    }
    else {
      return bankNumber
    }
  }


  return (
    <main className="user">

      <div className="userTitleContainer">

        <h1 className="userTitle">Editar Funcionário</h1>
        
        <button onClick={handleSubmit} className="userUpdateButton">Atualizar</button>

      </div>

      <div className="userContainer">
      
        <div className="userShow">
          
          <div className="userShowTop">
            <img
              src={userImage}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername"> { userData.name } </span>
              <span className="userShowUserTitle">Cargo: { userData.job_role }</span>
              <span className="userShowUserTitle">Código: { userData.id }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Funcionário</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Nascimento:</h6> 
              <span className="userShowInfoTitle">{ `${new Date( userData.birthday ).toLocaleDateString('pt-br')}`}</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Gênero:</h6> 
              <span className="userShowInfoTitle">{ infoMap[ userData.gender ] }</span>
            </div>
            
            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Estado Civil:</h6> 
              <span className="userShowInfoTitle">{ infoMap[ userData.marital_status ] }</span>
            </div>

            <div className="userShowInfo">           
              <h6 className="userShowInfoTitle--Subtitle">RG:</h6> 
              <span className="userShowInfoTitle">{ userData.rg }</span>
            </div>

            <div className="userShowInfo">           
              <h6 className="userShowInfoTitle--Subtitle">CPF:</h6> 
              <span className="userShowInfoTitle">{ userData.cpf }</span>
            </div>


            <div className="userShowInfo">
              <LocalPhone className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.telephone }</span>
            </div>     

            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.mobile }</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.email }</span>
            </div>

            <span className="userShowTitle">Informações Financeiras</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Salário:</h6> 
              <span className="userShowInfoTitle"> R$ { userData.salary }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Vale Tranporte (total por dia):</h6> 
              <span className="userShowInfoTitle">R$ { userData.transportation_voucher }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Instituição Financeira:</h6>
              <span className="userShowInfoTitle">{ financialInstitution( userData.bank_number ) }</span>
              {/* <span className="userShowInfoTitle">{ userData.bank_number }</span> */}
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Agência:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_agency }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Tipo de Conta:</h6> 
              <span className="userShowInfoTitle">{ infoMap[ userData.bank_accountType ] }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Número da Conta:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_accountNumber }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Chave PIX:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_pix }</span>
            </div>

            <span className="userShowTitle">Endereço:</span>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">CEP:</h6> { userData.cep }</span>
            </div>            

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Endereço:</h6> { userData.address }, { userData.addressNumber }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Complemento:</h6> { userData.aditionalInformation }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Bairro:</h6> { userData.neighborhood }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle"><h6 className="userShowInfoTitle--Subtitle">Cidade/Estado:</h6> { userData.city } - { userData.state }</span>
            </div>

            <span className="userShowTitle">Informações Adicionais</span>

            <div className="userShowInfo">
              <Info className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.moreInfo } </span>
            </div>

          </div>
        
        </div>
      
        <div className="userUpdate">

            <span className="userUpdateTitle">Editar</span>
            
            <form onSubmit={handleSubmit} className="userUpdateForm">
              
              <div className="userUpdateLeft">
                
                <div className="userUpdateItem">
                  <label>Nome</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.name }
                    className="userUpdateInput"
                    onChange={handleInformationChange('name')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>RG</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.rg }
                    className="userUpdateInput"
                    onChange={handleInformationChange('rg')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Gênero</label>
                  <select name="estados-brasil" className="userUpdateInput" defaultValue={employeeData['gender']} onChange={handleInformationChange('gender')} required>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>   
                </div>

                <div className="userUpdateItem">
                  <label>Telefone</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.telephone }
                    className="userUpdateInput"
                    onChange={handleInformationChange('telephone')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.email }
                    className="userUpdateInput"
                    onChange={handleInformationChange('email')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Endereço</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.address }
                    className="userUpdateInput"
                    onChange={handleInformationChange('address')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Complemento</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.aditionalInformation }
                    className="userUpdateInput"
                    onChange={handleInformationChange('aditionalInformation')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Cidade</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.city }
                    className="userUpdateInput"
                    onChange={handleInformationChange('city')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Cargo</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.job_role }
                    className="userUpdateInput"
                    onChange={handleInformationChange('job_role')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Vale Transporte</label>
                  <input
                    type="number"
                    defaultValue={ employeeData.transportation_voucher }
                    className="userUpdateInput"
                    onChange={handleInformationChange('transportation_voucher')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Tipo de Conta</label>
                  <select name="estados-brasil" className="userUpdateInput" defaultValue={ employeeData.bank_accountType } onChange={handleInformationChange('bank_accountType')} required>
                    <option value="choose">Escolha o tipo da Conta</option>
                    <option value="corrente">Corrente</option>
                    <option value="poupanca">Poupança</option>
                    <option value="salario">Salário</option>
                  </select>   
                </div>

                <div className="userUpdateItem">
                  <label>Número da Conta</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.bank_accountNumber }
                    className="userUpdateInput"
                    onChange={handleInformationChange('bank_accountNumber')}
                  />
                </div>

              </div>

              <div className="userUpdateRight--singleItem">

                <div className="userUpdateItem">
                    <label>Nascimento</label>
                    <input
                      type="date"
                      // defaultValue={ employeeData.birthday}
                      defaultValue={ new Date(employeeData.birthday).toISOString().substring(0,10) }
                      className="userUpdateInput"
                      onChange={handleInformationChange('birthday')}
                    />
                </div>

                <div className="userUpdateItem">
                  <label>CPF</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.cpf }
                    className="userUpdateInput"
                    onChange={handleInformationChange('cpf')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Estado Civil</label>
                  <select name="estados-brasil" className="userUpdateInput" defaultValue={employeeData['marital_status']} onChange={handleInformationChange('marital_status')} required>
                    <option value="solteiro">Solteiro(a)</option>
                    <option value="casado">Casado(a)</option>
                    <option value="divorciado">Divorciado(a)</option>
                    <option value="viuvo">Viúvo(a)</option>
                    <option value="outro">Outro</option>
                  </select>    
                </div>

                <div className="userUpdateItem">
                  <label>Celular</label>
                  <input
                    type="tel"
                    defaultValue={ employeeData.mobile }
                    className="userUpdateInput"
                    onChange={handleInformationChange('mobile')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>CEP</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.cep }
                    className="userUpdateInput"
                    onBlur={checkCep}
                    // onChange={handleInformationChange('cep')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Número</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.addressNumber }
                    className="userUpdateInput"
                    onChange={handleInformationChange('addressNumber')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Bairro</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.neighborhood }
                    className="userUpdateInput"
                    onChange={handleInformationChange('neighborhood')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Estado</label>
                  <select name="estados-brasil" className="userUpdateInput" defaultValue={employeeData['state']} onChange={handleInformationChange('state')} required>
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

                <div className="userUpdateItem">
                  <label>Salário</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.salary }
                    className="userUpdateInput"
                    onChange={handleInformationChange('salary')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Instituição Financeira</label>                
                  <select name="estados-brasil" className="userUpdateInput" defaultValue={parseInt(employeeData['bank_number'])} onChange={handleInformationChange('bank_number')} required>
                      {
                        bankData.map( (data, key) => {
                          return (<option value={data['code']} key={key}>{data['code']} - {data['name']}</option>);
                        })
                      }
                  </select>    
                </div>

                <div className="userUpdateItem">
                  <label>Agência</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.bank_agency }
                    className="userUpdateInput"
                    onChange={handleInformationChange('bank_agency')}
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Chave PIX</label>
                  <input
                    type="text"
                    defaultValue={ employeeData.bank_pix }
                    className="userUpdateInput"
                    onChange={handleInformationChange('bank_pix')}
                  />
                </div>
                  
              </div>

                <div className="userUpdateItem--textArea">            
                  <label className="form__input--label">Informações adicionais</label>
                  <textarea 
                    className="form__input"
                    rows="2"
                    defaultValue={ employeeData.moreInfo }
                    onChange={handleInformationChange('moreInfo')}
                    ></textarea>          
                </div>

            </form> 

        </div>
    </div>
  </main>

  )
}


