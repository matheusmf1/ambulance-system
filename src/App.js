import React from "react";
import './app.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
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
import MaterialAdd from "./pages/inventory/materialAdd/MaterialAdd";
import InventoryList from "./pages/inventory/InventoryList";
import MaterialInfo from "./pages/inventory/materialnfo/MaterialInfo";
import ProductsList from "./pages/products/ProductsList";
import ProductsAdd from "./pages/products/productsAdd/ProductsAdd";
import ProductsInfo from "./pages/products/productslnfo/ProductsInfo";
import InvoiceInAdd from "./pages/invoice/invoice-in/InvoiceInAdd";
import InvoiceOutAdd from "./pages/invoice/invoice-out/InvoiceOutAdd";
import InvoiceList from "./pages/invoice/InvoiceList";
import InvoiceInInfo from "./pages/invoice/invoice-in/InvoiceInInfo";
import InvoiceOutInfo from "./pages/invoice/invoice-out/InvoiceOutInfo";
import Calendar from "./pages/calendar/Calendar";
import Signup from "./pages/login/Signup";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/login/PrivateRoute";
import ForgotPassword from "./pages/login/ForgotPassword";
import UpdateProfile from "./pages/login/UpdateProfile";

function App() {

  return (
    <div className="container1">

      <Router>
        <AuthProvider>
        
          <Switch>

            {/* LOGIN */}
            <Route path="/signup" component={Signup}/>

            <Route path="/login" component={Login}/>

            <Route path="/forgot-password" component={ForgotPassword} />

            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            

            {/* HOME */}
            <PrivateRoute exact path="/" component={Home}/>

            {/* CLIENTES */}
            <PrivateRoute exact path="/clientes" component={CustomerList}/>

            <PrivateRoute exact path="/clientes/cadastro" component={CustomerAdd}/>

            <PrivateRoute exact path="/cliente/:id" component={CustomerInfo}/>

            {/* VENDA */}
            <PrivateRoute path="/venda/nova-os" component={SalesServiceOrder}/>

            <PrivateRoute exact path="/venda/os/:id" component={ServiceOrderInfo}/>

            <PrivateRoute path="/venda/nova-venda" component={ProductSale}/>
              
            <PrivateRoute exact path="/venda/venda_produto/:id" component={ProductSaleInfo}/>

            <PrivateRoute path="/venda/nova-transformacao" component={SalesTransformationProposal}/>
             
            <PrivateRoute exact path="/venda/transformacao/:id" component={TransformationProposalInfo}/>

            <PrivateRoute exact path="/vendas" component={QuoteSalesList}/>


            {/* FORNECEDOR */}
            <PrivateRoute exact path="/fornecedores" component={SupplierList}/>

            <PrivateRoute path="/fornecedores/cadastro" component={SupplierAdd}/>

            <PrivateRoute path="/fornecedor/:id" component={SupplierInfo}/>

            {/* FUNCIONARIO */}
            <PrivateRoute exact path="/funcionarios" component={EmployeeList}/>

            <PrivateRoute path="/funcionarios/cadastro" component={EmployeeAdd}/>
            
            <PrivateRoute path="/funcionario/:id" component={EmployeeInfo}/>


            {/* ORCAMENTO */}
            <PrivateRoute exact path="/orcamento/nova-os" component={GetQuoteServiceOrder}/>

            <PrivateRoute exact path="/orcamento/os/:id" component={ServiceOrderInfo}/>

            <PrivateRoute exact path="/orcamento/nova-venda" component={GetQuoteProductSale}/>

            <PrivateRoute exact path="/orcamento/venda_produto/:id" component={ProductSaleInfo}/>

            <PrivateRoute exact path="/orcamento/nova-transformacao" component={GetQuoteTransformationProposal}/>

            <PrivateRoute exact path="/orcamento/transformacao/:id" component={TransformationProposalInfo}/>

            <PrivateRoute exact path="/orcamentos" component={QuoteSalesList}/>


            {/* FINANCEIRO */}
            <PrivateRoute exact path="/financeiro/pagas/:id" component={BillsPayInfo}/>

            <PrivateRoute exact path="/financeiro/pagas" component={BillPaidList}/>
            
            <PrivateRoute exact path="/financeiro/pagar" component={BillToPayList}/>

            <PrivateRoute exact path="/financeiro/pagar/cadastro" component={NewBillToPay}/>

            <PrivateRoute exact path="/financeiro/recebidos/:id" component={BillsReceiveInfo}/>

            <PrivateRoute exact path="/financeiro/recebidos" component={BillReceivedList}/>

            <PrivateRoute exact path="/financeiro/receber" component={BillToReceiveList}/>

            <PrivateRoute exact path="/financeiro/receber/cadastro" component={NewBillToReceive}/>


            {/* ALMOXARIFADO */}
            <PrivateRoute exact path="/almoxarifado" component={InventoryList}/>

            <PrivateRoute exact path="/almoxarifado/cadastro" component={MaterialAdd}/>

            <PrivateRoute exact path="/almoxarifado/:id" component={MaterialInfo}/>


            {/* PRODUTOS */}
            <PrivateRoute exact path="/produtos" component={ProductsList}/>

            <PrivateRoute exact path="/produtos/cadastro" component={ProductsAdd}/>

            <PrivateRoute exact path="/produtos/:id" component={ProductsInfo}/>

            {/* NOTA FISCAL */}
            <PrivateRoute exact path="/nota-fiscal/entrada" component={InvoiceList}/>

            <PrivateRoute exact path="/nota-fiscal/entrada/cadastro" component={InvoiceInAdd}/>

            <PrivateRoute exact path="/nota-fiscal/entrada/:id" component={InvoiceInInfo}/>

            <PrivateRoute exact path="/nota-fiscal/saida" component={InvoiceList}/>

            <PrivateRoute exact path="/nota-fiscal/saida/cadastro" component={InvoiceOutAdd}/>

            <PrivateRoute exact path="/nota-fiscal/saida/:id" component={InvoiceOutInfo}/>

            {/* CALENDÁRIO */}
            <PrivateRoute exact path="/calendario" component={Calendar}/>

          </Switch>

        </AuthProvider>

      </Router>

 
    </div>
  );
}

export default App;