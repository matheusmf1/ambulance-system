import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

export default function PrivateRoute({ component: Component, topbar, sidebar, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <>
          <Topbar/>
          <Sidebar/>
          <Component {...props} />
          </>
        )
        
         : <Redirect to="/login" />
      }}
    ></Route>
  )
}
