import { React, Component } from 'react'
import { Table } from '../../../components/tables/searchTable/table';
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import LoadingSpinner from '../../../components/LoadingSpinner';

export default class EmployeeList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      collection: [],
      loading: true
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

    const employeeCollectionRef = collection( db, `users/${auth.currentUser.uid}/employees` )
    const queryResult = query( employeeCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { employees: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => {
        this.setState( { collection: this.state.employees.slice( 0, 10 ) } )
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
            tableName="Lista de Funcionários"
            columns={ this.tableColumns }
            data={ this.state.employees }
            link="funcionario"
            linkCadastro="/funcionarios/cadastro"
            collection2={this.state.collection}
            setCollection2={setCollection}
          />
        )
      }
      </>
    )
  }

}