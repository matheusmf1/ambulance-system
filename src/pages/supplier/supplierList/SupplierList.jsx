import { React, Component } from 'react'
import { Table } from '../../../components/tables/searchTable/table';

import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy, limit } from "firebase/firestore";


export default class SupplierList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suppliers: [],
      collection: []
    }
  }

  tableColumns = {
    id: "Código",
    contact: "Contato",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    cnpj_cpf: "CPNJ/CPF",
    city: "Cidade",
    action: "Opções"
  };

  componentDidMount = async () => {

    const supplierCollectionRef = collection( db, "suppliers" )

    const queryResult = query( supplierCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { suppliers: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => this.setState( { collection: this.state.suppliers.slice( 0, 10 ) } ));

  };


  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }
    
    return (
      <>
        <Table
          tableName="Lista de Fornecedores"
          columns={ this.tableColumns }
          data={ this.state.suppliers }
          link="fornecedor"
          linkCadastro="/fornecedores/cadastro"
          collection2={this.state.collection}
          setCollection2={setCollection}
        />
      </>
    )
  }

}