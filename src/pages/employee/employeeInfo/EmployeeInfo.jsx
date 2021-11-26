import React from 'react'
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

  console.log( props )

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )
  // console.log( userData )

  return (
    <main className="user">

      <div className="userTitleContainer">

        <h1 className="userTitle">Editar Funcionário</h1>
        
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
              <span className="userShowUserTitle">Cargo: { userData.cargo }</span>
              <span className="userShowUserTitle">Código: { userData.id }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Funcionário</span>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Nascimento:</h6> 
              <span className="userShowInfoTitle">{ userData.birthday }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Gênero:</h6> 
              <span className="userShowInfoTitle">{ userData.gender }</span>
            </div>
            
            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Estado Civil:</h6> 
              <span className="userShowInfoTitle">{ userData.estado_civil }</span>
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
              <span className="userShowInfoTitle">R$ { userData.vale_transporte }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Instituição Financeira:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_number }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Agência:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_agency }</span>
            </div>

            <div className="userShowInfo">
              <h6 className="userShowInfoTitle--Subtitle">Tipo de Conta:</h6> 
              <span className="userShowInfoTitle">{ userData.bank_accountType }</span>
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
                <label>RG</label>
                <input
                  type="text"
                  placeholder={ userData.rg }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Gênero</label>
                <input
                  type="text"
                  placeholder={ userData.gender }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Telefone</label>
                <input
                  type="text"
                  placeholder={ userData.telephone }
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

              <div className="userUpdateItem">
                <label>Cargo</label>
                <input
                  type="text"
                  placeholder={ userData.cargo }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Vale Transporte</label>
                <input
                  type="text"
                  placeholder={ userData.vale_transporte }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Tipo de Conta</label>
                <input
                  type="text"
                  placeholder={ userData.bank_accountType }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Número da Conta</label>
                <input
                  type="text"
                  placeholder={ userData.bank_accountNumber }
                  className="userUpdateInput"
                />
              </div>

            </div>

            <div className="userUpdateRight--singleItem">

            <div className="userUpdateItem">
                <label>Nascimento</label>
                <input
                  type="text"
                  placeholder={ userData.birthday }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>CPF</label>
                <input
                  type="tel"
                  placeholder={ userData.cpf }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Estado Civil</label>
                <input
                  type="text"
                  placeholder={ userData.estado_civil }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Celular</label>
                <input
                  type="text"
                  placeholder={ userData.mobile }
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

              <div className="userUpdateItem">
                <label>Salário</label>
                <input
                  type="text"
                  placeholder={ userData.salary }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Instituição Financeira</label>
                <input
                  type="text"
                  placeholder={ userData.bank_number }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Agência</label>
                <input
                  type="text"
                  placeholder={ userData.bank_agency }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Chave PIX</label>
                <input
                  type="text"
                  placeholder={ userData.bank_pix }
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


