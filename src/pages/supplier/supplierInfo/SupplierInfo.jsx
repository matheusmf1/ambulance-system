import React from 'react'
import {
  MailOutline,
  LocalPhone,
  Info,
  PhoneAndroid,
} from "@material-ui/icons";

import { tableProviderData } from '../../../assets/mock/tableProviderData.js';

import BusinessIcon from '@material-ui/icons/Business';
import userImage from '../../../assets/images/user.png'

const fetchUserData = ( id ) => {

  return tableProviderData.filter( user => user.id === id )[0] 

}

export default function SupplierInfo( props ) {


  console.log( props )

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )
  // console.log( userData )

  return (
    <main className="user">

      <div className="userTitleContainer">

        <h1 className="userTitle">Editar Fornecedor</h1>
        
        <button className="userUpdateButton">Atualizar</button>

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
              <span className="userShowUserTitle">Código: { userData.id }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Responsável</span>

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
          
          <form className="userUpdateForm">
            
            <div className="userUpdateLeft">
              
              <div className="userUpdateItem">
                <label>Nome</label>
                <input
                  type="text"
                  placeholder={ userData.name }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={ userData.email }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <input
                  type="tel"
                  placeholder={ userData.mobile }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Endereço</label>
                <input
                  type="text"
                  placeholder={ userData.address }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Complemento</label>
                <input
                  type="text"
                  placeholder={ userData.aditionalInformation }
                  className="userUpdateInput"
                />
              </div>


              <div className="userUpdateItem">
                <label>Cidade</label>
                <input
                  type="text"
                  placeholder={ userData.city }
                  className="userUpdateInput"
                />
              </div>


            </div>

            <div className="userUpdateRight--singleItem">

            <div className="userUpdateItem">
                <label>CPF</label>
                <input
                  type="text"
                  placeholder={ userData.cnpj_cpf }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <input
                  type="tel"
                  placeholder={ userData.telephone }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>CEP</label>
                <input
                  type="text"
                  placeholder={ userData.cep }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Número</label>
                <input
                  type="text"
                  placeholder={ userData.addressNumber }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Bairro</label>
                <input
                  type="text"
                  placeholder={ userData.neighborhood }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado</label>
                <input
                  type="text"
                  placeholder={ userData.state }
                  className="userUpdateInput"
                />
              </div>
                 
            </div>

              <div class="userUpdateItem--textArea">            
                <label class="form__input--label">Informações adicionais</label>
                <textarea class="form__input" rows="2" placeholder={ userData.moreInfo }></textarea>          
              </div>

          </form> 


        </div>
    
    </div>
 
  </main>

  )
}


