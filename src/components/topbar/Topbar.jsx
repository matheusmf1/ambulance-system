
import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useHistory } from "react-router-dom";
import Alert from '@mui/material/Alert';
import "./topbar.css";

import { NotificationsNone, Settings } from "@material-ui/icons";

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

  return (
    <div className="topbar">
      
      <div className="topbarWrapper">

        <div className="topLeft">

          <div className="sidebar__menu--barIcon navMenuIcon">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 25 25" width="25px" height="25px" stroke="black" strokeWidth="0.1">
              <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
            </svg>
          </div>

          <span className="logo"></span>
        </div>

        <div className="topRight">
          {error && <Alert severity="error">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}

          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>

          <div className="topbarIconContainer" onClick={handleLogout}>
            <Settings />
          </div>

          <img 
            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            className="topAvatar"
            alt=""
            onClick={ () => history.push("/update-profile")} />
        
        </div>

      </div>
    </div>
  );
}
