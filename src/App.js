import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './app.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home"
import CustomerAdd from "./pages/customer/customerAdd/CustomerAdd"
import CustomerInfo from "./pages/customer/customerInfo/CustomerInfo";
import CustomerList from "./pages/customer/customerList/CustomerList";
import NewServiceOrder from "./pages/service_order/newServiceOrder/NewServiceOrder";


function App() {
  
  return (

    <div className="container">

      <Router>

        <Topbar/> 
        
        <Sidebar/>

        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/cliente">
            <CustomerList/>
          </Route>

          <Route path="/cliente/:id" component={CustomerInfo}/>

          <Route path="/novocliente">
            <CustomerAdd/>
          </Route>

          <Route exact path="/nova-os">
            <NewServiceOrder/>
          </Route>

        </Switch>

      </Router>

 
    </div>
  );
}

export default App;
