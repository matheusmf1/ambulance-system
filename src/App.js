import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './app.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home/Home"
import CustomerAdd from "./pages/customer/customerAdd/CustomerAdd"
import CustomerInfo from "./pages/customer/customerInfo/CustomerInfo";
import CustomerList from "./pages/customer/customerList/CustomerList";
import SupplierAdd from "./pages/supplier/supplierAdd/SupplierAdd";
import SupplierInfo from "./pages/supplier/supplierInfo/SupplierInfo";
import SupplierList from "./pages/supplier/supplierList/SupplierList";
import EmployeeAdd from "./pages/employee/employeeAdd/EmployeeAdd";
import EmployeeList from "./pages/employee/employeeList/EmployeeList";
import EmployeeInfo from "./pages/employee/employeeInfo/EmployeeInfo";
import ProductSale from "./pages/sales/products_sale/ProductSale";
import SalesServiceOrder from "./pages/sales/service_order/SalesServiceOrder";
import SalesTransformationProposal from "./pages/sales/transformation_proposal/SalesTransformationProposal";
import GetQuoteProductSale from "./pages/getQuote/products_sale/ProductSale";
import GetQuoteServiceOrder from "./pages/getQuote/service_order/GetQuoteServiceOrder";
import GetQuoteTransformationProposal from "./pages/getQuote/transformation_proposal/GetQuoteTransformationProposal";
import BillToPayList from "./pages/financial/billsToPay/BillToPayList.jsx";
import NewBillToPay from "./pages/financial/billsToPay/NewBillToPay";
import BillToReceiveList from "./pages/financial/billsToReceive/BillToReceiveList.jsx";
import NewBillToReceive from "./pages/financial/billsToReceive/NewBillToReceive";
import BillPaidList from "./pages/financial/billsPaid/BillPaidList";
import BillReceivedList from "./pages/financial/billsReceived/BillReceivedList";
import BillsPayInfo from "./pages/financial/billsInfo/BillsPayInfo";
import BillsReceiveInfo from "./pages/financial/billsInfo/BillsReceiveInfo";
import QuoteSalesList from "./pages/getQuote/list_visualization/QuoteSalesList.jsx";
import TransformationProposalInfo from "./components/GetQuote_Sales/transformation_proposal/TransformationProposalInfo";
import ServiceOrderInfo from "./components/GetQuote_Sales/service_order/ServiceOrderInfo.jsx";
import ProductSaleInfo from "./components/GetQuote_Sales/products_sale/ProductSaleInfo.jsx";

function App() {
  return (
    <div className="container">

      <Router>

        <Topbar/> 
        
        <Sidebar/>

        <Switch>

        {/* HOME */}
          <Route exact path="/">
            <Home/>
          </Route>

          {/* CLIENTES */}
          <Route exact path="/clientes">
            <CustomerList/>
          </Route>

          <Route exact path="/clientes/cadastro">
            <CustomerAdd/>
          </Route>

          <Route exact path="/cliente/:id" component={CustomerInfo}/>

          {/* VENDA */}
          <Route path="/venda/nova-os">
            <SalesServiceOrder/>
          </Route>

          <Route exact path="/venda/os/:id" component={ServiceOrderInfo}/>

          <Route path="/venda/nova-venda">
            <ProductSale/>
          </Route>

          <Route exact path="/venda/venda_produto/:id" component={ProductSaleInfo}/>

          <Route path="/venda/nova-transformacao">
            <SalesTransformationProposal/>
          </Route>

          <Route exact path="/venda/transformacao/:id" component={TransformationProposalInfo}/>

          <Route exact path="/vendas">
            <QuoteSalesList/>
          </Route>


          {/* FORNECEDOR */}
          <Route exact path="/fornecedores">
            <SupplierList/>
          </Route>

          <Route path="/fornecedores/cadastro">
            <SupplierAdd/>
          </Route>

          <Route path="/fornecedor/:id" component={SupplierInfo}/>

          {/* FUNCIONARIO */}
          <Route exact path="/funcionarios">
            <EmployeeList/>
          </Route>

          <Route path="/funcionarios/cadastro">
            <EmployeeAdd/>
          </Route>

          <Route path="/funcionario/:id" component={EmployeeInfo}/>


          {/* ORCAMENTO */}
          <Route exact path="/orcamento/nova-os">
            <GetQuoteServiceOrder/>
          </Route>

          <Route exact path="/orcamento/os/:id" component={ServiceOrderInfo}/>

          <Route exact path="/orcamento/nova-venda">
            <GetQuoteProductSale/>
          </Route>

          <Route exact path="/orcamento/venda_produto/:id" component={ProductSaleInfo}/>

          <Route exact path="/orcamento/nova-transformacao">
            <GetQuoteTransformationProposal/>
          </Route>

          <Route exact path="/orcamento/transformacao/:id" component={TransformationProposalInfo}/>

          <Route exact path="/orcamentos">
            <QuoteSalesList/>
          </Route>

          {/* FINANCEIRO */}
          <Route exact path="/financeiro/pagas/:id" component={BillsPayInfo}/>

          <Route exact path="/financeiro/pagas">
            <BillPaidList/>
          </Route>
          
          <Route exact path="/financeiro/pagar">
            <BillToPayList/>
          </Route>

          <Route exact path="/financeiro/pagar/cadastro">
            <NewBillToPay/>
          </Route>

          <Route exact path="/financeiro/recebidos/:id" component={BillsReceiveInfo}/>

          <Route exact path="/financeiro/recebidos">
            <BillReceivedList/>
          </Route>

          <Route exact path="/financeiro/receber">
            <BillToReceiveList/>
          </Route>

          <Route exact path="/financeiro/receber/cadastro">
            <NewBillToReceive/>
          </Route>

        </Switch>

      </Router>

 
    </div>
  );
}

export default App;