import {React, useState} from 'react'
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
  Web
} from "@material-ui/icons";

import { tableProviderData } from '../../../assets/mock/tableProviderData.js';

import BusinessIcon from '@material-ui/icons/Business';
import userImage from '../../../assets/images/user.png'

import InputCpfCnpj from '../../../components/inputs/input--cpfCnpj';
import InputPhoneNumber from '../../../components/inputs/input--phoneNumber'
import InputCep from '../../../components/inputs/input--cep';

const fetchUserData = ( id ) => {

  return tableProviderData.filter( user => user.id === id )[0] 

}

export default function SupplierInfo( props ) {

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )

  const [ supplierData, setSupplierData ] = useState(
    {
      id: `${userData['id']}`,
      responsable: `${userData['responsable']}`,
      contact: `${userData['contact']}`,
      cnpj_cpf: `${userData['cnpj_cpf']}`,
  
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
      site: `${userData['site']}`,

      moreInfo: `${userData['moreInfo']}`,
    }
  )
  
  const handleInformationChange = ( id ) => ( e ) => {
    setSupplierData( { ...supplierData, [id]: e.target.value } )
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
        setSupplierData( { ...supplierData, "cep": cep, "address": data['logradouro'], "neighborhood": data['bairro'], "city": data['localidade'], "state": data['uf'] } );
  
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }
  }
  
  const handleSubmit = ( e ) => {

    e.preventDefault();
  
    console.log( supplierData )
  }
  

  return (
    <main className="user">

      <div className="userTitleContainer">

        <h1 className="userTitle">Editar Fornecedor</h1>
        
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

            <span className="userShowTitle">Informações do Fornecedor</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">CNPJ:</h6> 
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

            <div className="userShowInfo">
              <Web className="userShowIcon" />
          
              <a className="userShowInfoTitle" href={`http://${userData.site}`} target="_blank" rel="noopener noreferrer">
                {/* { userData.site != "" ? userData.site : 'Campo não informado' } */}
                { userData.site }
              </a>
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
          
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Responsável</label>
                <input
                  type="text"
                  defaultValue={ supplierData.responsable }
                  className="userUpdateInput"
                  onChange={handleInformationChange('responsable')}
                />
              </div>

              <div className="userUpdateItem">
                <label>CPF/CNPJ</label>
                <InputCpfCnpj defaultValue={ supplierData.cnpj_cpf } className="userUpdateInput" onChange={handleInformationChange('cnpj_cpf')}/>
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <InputPhoneNumber mask="(99) 99999-9999" defaultValue={ supplierData.mobile } className="userUpdateInput" onChange={handleInformationChange('mobile')}/>
              </div>

              <div className="userUpdateItem">
                <label>CEP</label>
                <InputCep defaultValue={ supplierData.cep } className="userUpdateInput" onBlur={checkCep} />
              </div>

              <div className="userUpdateItem">
                <label>Complemento</label>
                <input
                  type="text"
                  defaultValue={ supplierData.aditionalInformation }
                  className="userUpdateInput"
                  onChange={handleInformationChange('aditionalInformation')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Cidade</label>
                <input
                  type="text"
                  defaultValue={ supplierData.city }
                  className="userUpdateInput"
                  onChange={handleInformationChange('city')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado</label>
                <input
                  type="text"
                  defaultValue={ supplierData.state }
                  className="userUpdateInput"
                  onChange={handleInformationChange('state')}
                />
              </div>
            </div>

            <div className="userUpdateRight--singleItem">

              <div className="userUpdateItem">
                <label>Contato</label>
                <input
                  type="text"
                  defaultValue={ supplierData.contact }
                  className="userUpdateInput"
                    onChange={handleInformationChange('contact')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  defaultValue={ supplierData.email }
                  className="userUpdateInput"
                    onChange={handleInformationChange('email')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <InputPhoneNumber mask="(99) 9999-9999" defaultValue={ supplierData.telephone } className="userUpdateInput" onChange={handleInformationChange('telephone')}/>
              </div>

              <div className="userUpdateItem">
                <label>Endereço</label>
                <input
                  type="text"
                  defaultValue={ supplierData.address }
                  className="userUpdateInput"
                  onChange={handleInformationChange('address')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Número</label>
                <input
                  type="text"
                  defaultValue={ supplierData.addressNumber }
                  className="userUpdateInput"
                  onChange={handleInformationChange('addressNumber')}
                />
              </div>

              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  defaultValue={ supplierData.neighborhood }
                  className="userUpdateInput"
                  onChange={handleInformationChange('neighborhood')}
                />
              </div>
            </div>

            <div className="userUpdateItem--textArea">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea
                className="form__input"
                rows="2"
                defaultValue={supplierData.moreInfo}
                onChange={handleInformationChange('moreInfo')}></textarea>          
            </div>

          </form> 


        </div>
    
    </div>
 
  </main>

  )
}


