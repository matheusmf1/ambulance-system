import { React, Component } from 'react'
import { Table } from '../../../components/tables/searchTable/table';
import { db } from '../../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { query, orderBy } from "firebase/firestore";

export default class EmployeeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      collection: []
    }
  }

  tableColumns = {
    id: "Código",
    name: "Nome",
    email: "Email",
    telephone: "Telefone",
    mobile: "Celular",
    cpf: "CPF",
    city: "Cidade",
    action: "Opções"
  };

  componentDidMount = async () => {

    const employeeCollectionRef = collection( db, "employees" )
    const queryResult = query( employeeCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { employees: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => this.setState( { collection: this.state.employees.slice( 0, 10 ) } ));

  };


  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }
    
    return (
      <>
        <Table
          tableName="Lista de Funcionários"
          columns={ this.tableColumns }
          data={ this.state.employees }
          link="funcionario"
          linkCadastro="/funcionarios/cadastro"
          collection2={this.state.collection}
          setCollection2={setCollection}
        />
      </>
    )
  }

}