import {React, useState} from 'react'
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
} from "@material-ui/icons";

import "./customerInfo.css";

import { tableClientData } from '../../../assets/mock/tableClientData'

import BusinessIcon from '@material-ui/icons/Business';

import userImage from '../../../assets/images/user.png'

const fetchUserData = ( id ) => {

  return tableClientData.filter( user => user.id === id )[0] 

}

export default function CustomerInfo(props) {

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )

  const [customerData, setCustomerData] = useState(
    {
      id: `${userData['id']}`,
      responsable: `${userData['responsable']}`,
      contact: `${userData['contact']}`,
      corporate_name: `${userData['corporate_name']}`,
      fantasy_name: `${userData['fantasy_name']}`,
      cnpj_cpf: `${userData['cnpj_cpf']}`,
      email: `${userData['email']}`,
      telephone: `${userData['telephone']}`,
      mobile: `${userData['mobile']}`,
      cep: `${userData['cep']}`,
      address: `${userData['address']}`,
      addressNumber: `${userData['addressNumber']}`,
      aditionalInformation: `${userData['aditionalInformation']}`,
      neighborhood: `${userData['neighborhood']}`,
      city: `${userData['city']}`,
      state: `${userData['state']}`,
      moreInfo: `${userData['moreInfo']}`
    },
  );

  const handleInformationChange = ( id ) => ( e ) => {
    setCustomerData( { ...customerData, [id]: e.target.value } )    
  }


  const checkCep = ( e ) => {
    console.log( e.target )
    let cep = e.target.value.replace( /\D/g, '' );

    if ( cep ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( data => {
        console.log( data )
        setCustomerData( { ...customerData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }

  }


  const handleSubmit = ( e ) => {

    e.preventDefault();

    console.log( customerData ) 
  }

  return (
    <main className="user">

      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Cliente</h1>
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
              <span className="userShowUsername">Contato: { userData.contact } </span>
              <span className="userShowUsername">Responsável: { userData.responsable } </span>
              <span className="userShowUserTitle">Código: { userData.id }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Cliente</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Nome Fantasia</h6> 
              <span className="userShowInfoTitle">{ userData.fantasy_name }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Razão Social</h6> 
              <span className="userShowInfoTitle">{ userData.corporate_name }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">CNPJ</h6> 
              <span className="userShowInfoTitle">{ userData.cnpj_cpf }</span>
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


            <span className="userShowTitle">Endereço</span>

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
                <label>Responsável</label>
                <input
                  type="text"
                  defaultValue={ customerData.responsable }
                  className="userUpdateInput"
                  onChange={handleInformationChange('responsable')}
                />
              </div>
              
              <div className="userUpdateItem">
                <label>CNPJ/CPF</label>
                <input
                  type="text"
                  defaultValue={ customerData.cnpj_cpf }
                  className="userUpdateInput"
                  onChange={handleInformationChange('cnpj_cpf')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Razão Social</label>
                <input
                type="text"
                defaultValue={ customerData.corporate_name }
                className="userUpdateInput"
                  onChange={handleInformationChange('corporate_name')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <input
                  type="tel"
                  defaultValue={ customerData.telephone }
                  className="userUpdateInput"
                  onChange={handleInformationChange('telephone')}
                />
              </div>

              <div className="userUpdateItem">
                <label>CEP</label>
                <input
                  type="text"
                  defaultValue={ customerData.cep }
                  className="userUpdateInput"
                  onBlur={checkCep}
                  // onChange={handleInformationChange('cep')}
                />
              </div>


              <div className="userUpdateItem">
                <label>Número</label>
                <input
                  type="text"
                  defaultValue={ customerData.addressNumber }
                  className="userUpdateInput"
                  onChange={handleInformationChange('addressNumber')}
                />
              </div>


              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  defaultValue={ customerData.neighborhood }
                  className="userUpdateInput"
                  onChange={handleInformationChange('neighborhood')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado</label>
                <select name="estados-brasil" className="userUpdateInput" defaultValue={customerData['state']} onChange={handleInformationChange('state')}>
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

            </div>

            <div className="userUpdateRight--singleItem">

              <div className="userUpdateItem">
                <label>Contato</label>
                <input
                  type="text"
                  defaultValue={ customerData.contact }
                  className="userUpdateInput"
                  onChange={handleInformationChange('contact')}
                />
              </div>
              
              <div className="userUpdateItem">
                <label>Nome Fantasia</label>
                <input
                type="text"
                defaultValue={ customerData.fantasy_name }
                className="userUpdateInput"
                  onChange={handleInformationChange('fantasy_name')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={ customerData.email }
                  className="userUpdateInput"
                  onChange={handleInformationChange('email')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <input
                  type="tel"
                  defaultValue={ customerData.mobile }
                  className="userUpdateInput"
                  onChange={handleInformationChange('mobile')}
                />
              </div>

              

              <div className="userUpdateItem">
                <label>Endereço</label>
                <input
                  type="text"
                  defaultValue={ customerData.address }
                  className="userUpdateInput"
                  onChange={handleInformationChange('address')}
                />
              </div>



              <div className="userUpdateItem">
                <label>Complemento</label>
                <input
                  type="text"
                  defaultValue={ customerData.aditionalInformation }
                  className="userUpdateInput"
                  onChange={handleInformationChange('aditionalInformation')}
                />
              </div>


              <div className="userUpdateItem">
                <label>Cidade</label>
                <input
                  type="text"
                  defaultValue={ customerData.city }
                  className="userUpdateInput"
                  onChange={handleInformationChange('city')}
                />
              </div>
                 
            </div>

              <div className="userUpdateItem--textArea">            
                <label className="form__input--label">Informações adicionais</label>
                <textarea className="form__input" rows="2" defaultValue={ customerData.moreInfo }></textarea>          
              </div>

          </form> 



        </div>
    
      </div>
 
  </main>

  )
}


