import {React, Component} from 'react'
import { TableQuoteSales } from "../../../components/GetQuote_Sales/TableQuoteSales";

import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { TransformationProposal } from "../../../data/TransformationProposal";
import { ServiceOrder } from "../../../data/ServiceOrder";
import { ProductSale } from "../../../data/ProductSale";
import LoadingSpinner from '../../../components/LoadingSpinner';

export default class QuoteSalesList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      collection: [],
      loading: true
    }
  }

  pathName = window.location.pathname;
  sessionName = this.pathName.split("/")[1];
  session = "";

  docSnaps = []

  tableColumns = {
    id: "Nº Serviço",
    serviceType: "Serviço",
    clientNumber: "Cod. Cliente",
    companyName: "Empresa",
    cpf: "CPNJ/CPF",
    email: "Email",
    status: "Status",
    action: "Opções",
  };

  componentDidMount = async () => {

    if ( this.sessionName === "orcamentos" ) {
      this.session = "orcamento";
    }
    else {
      this.session = "venda";
    }

    const productsSale = collection( db, `orcamento_venda_productsSale` )
    const queryResult1 = query( productsSale, where("mainService", "==", `${this.session}`) );
    const docSnap1 = await getDocs( queryResult1 );

    const serviceOrder = collection( db, `orcamento_venda_serviceOrder` )
    const queryResult2 = query( serviceOrder, where("mainService", "==", `${this.session}`) );
    const docSnap2 = await getDocs( queryResult2 );
    
    const transformationProposal = collection( db, `orcamento_venda_transformationProposal` )
    const queryResult3 = query( transformationProposal, where("mainService", "==", `${this.session}`), orderBy("id") );
    const docSnap3 = await getDocs( queryResult3 );
    
    this.docSnaps.push( docSnap1, docSnap2, docSnap3 );

    this.docSnaps.forEach( docSnap => docSnap.docs.map( doc => {
      this.setState( { customers: [ ...this.state.customers, doc.data() ] },
      () => {
        this.setState( { collection: this.state.customers.slice( 0, 10 ) } )
        this.setState( { loading: false } )
      });
    }))

  };

  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id, type ) => {

      if ( type === "serviceOrder" ) {
        const serviceOrder = new ServiceOrder( { id: id  } );
        return await serviceOrder.deleteServiceOrderFromFirebase();
      } 
      else if ( type === "productsSale" ) {
        const productsSale = new ProductSale( { id: id } );
        return await productsSale.deleteProductSaleFromFirebase();
      }
      else if ( type === "transformationProposal" ) {
        const transformationProposal = new TransformationProposal( { id: id } );
        return await transformationProposal.deleteTransformationProposalFromFirebase(); 
      }

    }
    
    return (
      <>
      {
       this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
        <TableQuoteSales
          tableName= { this.sessionName === "orcamentos" ? "Serviços em Orçamentos" : "Serviços em Vendas"  }
          columns={ this.tableColumns }
          data={ this.state.customers }
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Procurar serviço, empresa, status..." }
          session={ this.session }
        />
       ) 
      }
      </>
    )
  }

}