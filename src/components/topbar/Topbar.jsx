
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import "./topbar.css";
import Profile from "./tabs/profile";

export default function Topbar() {

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Erro ao fazer logout")
    }
  }

  
	const toogleMenuBars = ( e ) => {

		let mainTarget = e.target;
		
		const getTargetAside = () => {
			while ( !mainTarget.classList.contains( "container" ) ) {
	
				let parentTarget = mainTarget.parentElement;

				if ( parentTarget.classList.contains( "container" ) ) {
					return parentTarget
				}
				else {
					mainTarget = parentTarget;
				}
			}
		}

		const targetContainer = getTargetAside();

    let container = ReactDOM.findDOMNode( targetContainer );
    let sidebar = container.querySelector( ".container__sidebar" );

		let initialWidth = document.body.clientWidth;
		
		if ( initialWidth <= 480 && sidebar.classList.contains( "active" ) ) {
			sidebar.classList.toggle( "collapse" )  
		}

		else if ( initialWidth <= 480 && !sidebar.classList.contains( "active" )  ) {
			sidebar.classList.toggle( "active" )
			sidebar.classList.toggle( "collapse" )
		}
		else {
			sidebar.classList.toggle( "active" )  
		}
	}

  return (
    <div className="topbar">
      
      <div className="topbarWrapper">

        <div className="topLeft">

          <div className="sidebar__menu--barIcon navMenuIcon" onClick={toogleMenuBars}>
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 25 25" width="25px" height="25px" stroke="black" strokeWidth="0.1">
              <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
            </svg>
          </div>

          <span className="logo"></span>

          <h4 className="topbar__userName">Bem vindo(a), {currentUser.displayName}</h4>
        </div>

        {error && <Alert severity="error">{error}</Alert>}

        <div className="topRight">

          <Profile logout={handleLogout}/>
        
        </div>

      </div>
    </div>
  );
}
