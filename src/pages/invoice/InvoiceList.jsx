import { React, Component } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Invoice } from '../../data/Invoice';
import { InvoiceTable } from '../../components/tables/invoice/InvoiceTable';


export default class InvoiceList extends Component {

  constructor(props) {
    super(props);
    this.sessionName = window.location.pathname.split("/")[2];

    this.state = {
      invoice: [],
      collection: []
    }
  }

  tableColumns_in = {
    id: "Número da Nota",
    supplier_id: "Código do Fornecedor",
    invoice_value: "Valor",
    invoice_issueDate: "Data de emissão",
    action: "Opções"
  };

  tableColumns_out = {
    id: "Número da Nota",
    customer_id: "Código do Cliente",
    invoice_value: "Valor",
    invoice_issueDate: "Data de emissão",
    invoice_service: "Serviço",
    action: "Opções"
  };

  componentDidMount = async () => {

    const invoiceCollectionRef = collection( db, "invoices" );

    const queryResult = query( invoiceCollectionRef, where( "invoice_type", "==", `${ this.sessionName === "entrada" ? "invoice_in" : "invoice_out" }` ) );
    const docSnap = await getDocs( queryResult );
    
    this.setState( { invoice: docSnap.docs.map( doc => ( {...doc.data()} ) ) },
      () => this.setState( { collection: this.state.invoice.slice( 0, 10 ) } ));

  };


  render() {

    const setCollection = ( value ) => {
      this.setState( {"collection":  value } )
    }

    const handleDelete = async ( id, invoiceType ) => {
      const data = new Invoice( { id: id, invoiceType: invoiceType } );
      return await data.deleteInvoiceFromFirebase();
    }
    
    return (
      <>
        <InvoiceTable
          tableName={ `Lista de Notas Fiscais ${this.sessionName === "entrada" ? "Entrada" : "Saída"}` }
          columns={ this.sessionName === "entrada"? this.tableColumns_in : this.tableColumns_out }
          data={ this.state.invoice }
          link={ this.sessionName }
          linkCadastro={`/nota-fiscal/${this.sessionName}/cadastro`}
          collection2={ this.state.collection }
          setCollection2={ setCollection }
          handleDelete={ handleDelete }
          searchPlaceholderName={ "Nº Nota, dia, valor..." }
        />
      </>
    )
  }

}