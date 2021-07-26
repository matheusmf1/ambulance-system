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
        <Link to="/newUser">
          <button className="userAddButton">Novo</button>
        </Link>
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
              <span className="userShowUserTitle">{ userData.company }</span>
            </div>
          </div>
          
          <div className="userShowBottom">

            <span className="userShowTitle">Informações de Contato</span>

            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.phone }</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.email }</span>
            </div>

            <div className="userShowInfo">
              <BusinessIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{ userData.company }</span>
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
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={ userData.phone }
                  className="userUpdateInput"
                />
              </div>

              <div className="userUpdateItem">
                <label>Nome da empresa</label>
                <input
                  type="text"
                  placeholder={ userData.company }
                  className="userUpdateInput"
                />
              </div>

            </div>

            <div className="userUpdateRight--singleItem ">
              
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
               */}
              <button className="userUpdateButton">Atualizar</button>
              
            </div>

          </form> 
        </div>
    </div>
 
  </main>

  )
}


