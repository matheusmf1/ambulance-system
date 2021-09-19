import React from 'react'
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./customerInfo.css";

import { allData } from '../../../assets/mock/tableData'

import BusinessIcon from '@material-ui/icons/Business';

import userImage from '../../../assets/images/user.png'

const fetchUserData = ( id ) => {

  return allData.filter( user => user.id === id )[0] 

}

export default function CustomerInfo(props) {

  let userID = props.match.params.id;
  let userData = fetchUserData( userID )
  console.log( userData )

  return (
    <main className="user">

      <div className="userTitleContainer">
        <h1 className="userTitle">Editar Cliente</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Novo</button>
        </Link> */}
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
              <span className="userShowUserTitle">{ userData.company_name }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações do Responsável</span>

            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.phone }</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.email }</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.cnpj_cpf }</span>
            </div>

            <span className="userShowTitle">Endereço</span>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.address }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.city } - { userData.state }</span>
            </div>

            <span className="userShowTitle">Informações Adicionais</span>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
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
                <label>Nome da empresa</label>
                <input
                  type="text"
                  placeholder={ userData.company_name }
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
                <label>Telefone</label>
                <input
                  type="tel"
                  placeholder={ userData.phone }
                  className="userUpdateInput"
                />
              </div>


            </div>

            <div className="userUpdateRight--singleItem">

            <div className="userUpdateItem">
                <label>CNPJ/CPF</label>
                <input
                  type="text"
                  placeholder={ userData.cnpj_cpf }
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
                <label>Cidade</label>
                <input
                  type="text"
                  placeholder={ userData.city }
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


