import {React, Component} from 'react'
import { Table } from '../../../components/tables/searchTable/table'

import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy, limit } from "firebase/firestore";
import LoadingSpinner from '../../../components/LoadingSpinner';

export default class CustomerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      collection: [],
      loading: true
    }
  }

  tableColumns = {
    id: "Código",
    contact: "Contato",
    fantasy_name: "Empresa",
    cnpj_cpf: "CPNJ/CPF",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    city: "Cidade",
    action: "Opções",
  };

  componentDidMount = async () => {

    const customerCollectionRef = collection( db, "customers" )
    const q = query( customerCollectionRef, orderBy("id"), limit(5));
    const queryResult = query( customerCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { customers: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => {
        this.setState( { collection: this.state.customers.slice( 0, 10 ) } )
        this.setState( { loading: false } )
      });

  };

  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }
    
    return (
      <> 
      { 
        this.state.loading === true ? ( <main><LoadingSpinner/></main> ) : (
          <Table
            tableName="Lista de Clientes"
            columns={this.tableColumns}
            data={ this.state.customers }
            link="cliente"
            linkCadastro="/clientes/cadastro"
            collection2={this.state.collection}
            setCollection2={setCollection}
        />
        )
      }
      </>
    );
  }
}