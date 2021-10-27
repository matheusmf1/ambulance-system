import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './app.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home"
import CustomerAdd from "./pages/customer/customerAdd/CustomerAdd"
import CustomerInfo from "./pages/customer/customerInfo/CustomerInfo";
import CustomerList from "./pages/customer/customerList/CustomerList";
import NewServiceOrder from "./pages/sales/service_order/newServiceOrder/NewServiceOrder";
import NewProductsSale from "./pages/sales/products_sale/newProductsSale/NewProductsSale";
import NewTransformationProposal from "./pages/sales/transformation_proposal/NewTransformationProposal";
import SuplierAdd from "./pages/suplier/suplierAdd/SuplierAdd";
import SuplierInfo from "./pages/suplier/suplierInfo/Supliernfo";
import SuplierList from "./pages/suplier/suplierList/SuplierList";
import EmployeeAdd from "./pages/employee/employeeAdd/EmployeeAdd";
import EmployeeList from "./pages/employee/employeeList/EmployeeList";
import EmployeeInfo from "./pages/employee/employeeInfo/EmployeeInfo";


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

          <Route exact path="/nova-venda">
            <NewProductsSale/>
          </Route>

          <Route exact path="/nova-transformacao">
            <NewTransformationProposal/>
          </Route>

          <Route exact path="/fornecedor">
            <SuplierList/>
          </Route>

          <Route path="/fornecedor/:id" component={SuplierInfo}/>

          <Route path="/novofornecedor">
            <SuplierAdd/>
          </Route>

          <Route exact path="/funcionario">
            <EmployeeList/>
          </Route>

          <Route path="/funcionario/:id" component={EmployeeInfo}/>

          <Route path="/novofuncionario">
            <EmployeeAdd/>
          </Route>

        </Switch>

      </Router>

 
    </div>
  );
}

export default App;
