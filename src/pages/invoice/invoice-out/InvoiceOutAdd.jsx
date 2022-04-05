import { React, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { Invoice } from '../../../data/Invoice';

const InvoiceOutAdd = props => {

  const [ customersData, setCustomersData ] = useState( [] );
  
  const [ serviceNumberData, setServiceNumberData ] = useState( [] );
  const [ loadingServiceData, setLoadingServiceData ] = useState( false );
  
  const [ invoiceFileData, setInvoiceFileData ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( false );

  const [ invoiceData, setInvoiceData ] = useState(
    {
      id: "",
      invoice_type: "invoice_out",
      customer_id: "choose",
      invoice_issueDate: "",
      invoice_value: "",
      invoice_file: "",
      invoice_moreInfo: "",
      invoice_service: "choose",
      invoice_serviceID: "choose"
    }
  );

  
  const history = useHistory();


  useEffect( async () => {

    const customersCollectionRef = collection( db, `users/${auth.currentUser.uid}/customers` );
    const queryResult = query( customersCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    setCustomersData( docSnap.docs.map( doc => ( {...doc.data()} ) ) );
  
  }, []);

  const fetchServiceData = async () => {

    if ( loadingServiceData ) {
      const customersCollectionRef = collection( db,  `users/${auth.currentUser.uid}/orcamento_venda_${ invoiceData['invoice_service'] }` );
      const queryResult = query( customersCollectionRef, where( "clientNumber", "==", `${invoiceData['customer_id']}` ) );
      const docSnap = await getDocs( queryResult );

      setServiceNumberData( docSnap.docs.map( doc => ( {...doc.data()} ) ) );
      setLoadingServiceData( false );
    
    }
  }

  useEffect( () => fetchServiceData() );

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === "invoice_issueDate" ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setInvoiceData( { ...invoiceData, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'invoice_value' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setInvoiceData( { ...invoiceData, [id]: amount } )
    }

    else if ( id === 'invoice_file' ) {
      
      if ( e.target.files[0] ) {
        setInvoiceData( { ...invoiceData, [id]: e.target.files[0]['name'] } );
      
        let data2 = {
          file: e.target.files[0]
        }
        setInvoiceFileData( data2 );
      } 
      else {
        setInvoiceData( { ...invoiceData, [id]: '' } );
        setInvoiceFileData( null );
      }
    }

    else if ( id === 'invoice_service' ) {
      setInvoiceData( { ...invoiceData, [id]: e.target.value } );
      setLoadingServiceData( true );
    }
    
    else {
      setInvoiceData( { ...invoiceData, [id]: e.target.value } )
    }
  }

  const checkIfFileHasChanged = () => {

    if ( invoiceFileData ) {
      return invoiceFileData;
    }
    else {
      return false;
    }
  }


  const handleSubmit = async ( e ) => {
    e.preventDefault();
    setIsLoading( true );

    if ( invoiceData['customer_id'] === "choose" || invoiceData['invoice_service'] === "choose" || invoiceData['invoice_serviceID'] === "choose" ) {
      alert( "Informe todas as informações necessárias!" );
    }
    else {
      
      const invoice = new Invoice( { data: invoiceData, id: invoiceData['id'], file: checkIfFileHasChanged() } );
      const result = await invoice.addInvoiceToFirebase();

      if ( result ) {
        alert( "Nota Fista cadastrada com sucesso" )
        history.push( "/nota-fiscal/saida" );
      }
      else {
        alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." );
        setIsLoading( false );
      }
    }
    
  }



  return (
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Nota Fiscal de Saída</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

          <div className="form__input--halfWidth">
            <label className="form__input--label">Cliente*</label>
            <select className="form__input" value={invoiceData['customer_id']} onChange={handleInformationChange('customer_id')} required>
              <option value="choose">Escolha o cliente</option>
                {
                  customersData.map( (data, key) => {
                    return (<option value={data['id']} key={key}>{data['id']} - {data['fantasy_name']}</option>);
                  })
                }

            </select>
          </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número da nota*</label>
              <input className="form__input" type="text" placeholder="Número da nota" onChange={handleInformationChange('id')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Emissão*</label>
              <input className="form__input" type="date" onChange={handleInformationChange('invoice_issueDate')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor da nota - (R$)*</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} onChange={handleInformationChange('invoice_value')} required/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Serviço*</label>
              <select name="forma-pagamento" className="form__input" onChange={handleInformationChange('invoice_service')}>
                <option value="choose">Escolha um serviço</option>
                <option value="transformationProposal">Proposta</option>
                <option value="serviceOrder">Ordem de Serviço</option>
                <option value="productsSale">Venda de Produto</option>
              </select>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número do Serviço do Cliente*</label>
              <select className="form__input" value={invoiceData['invoice_serviceID']} onChange={handleInformationChange('invoice_serviceID')} required>
                <option value="choose">Escolha número do serviço</option>
                  {
                    serviceNumberData.map( (data, key) => {
                      return (<option value={data['id']} key={key}>{data['id']}</option>);
                    })
                  }
              </select>
            </div>

            <div className="form__input--fullWidth">
              <label className="form__input--label">Arquivo da nota*</label>
              <input className="form__input" type="file" onChange={handleInformationChange('invoice_file')} required/>
            </div>

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleInformationChange('invoice_moreInfo')}></textarea>          
            </div>

          </div>
          
          <div className="form__container--buttons">
            <button type="submit" disabled={isLoading} className="form__button form__button--add">Adicionar</button>
            <button type="reset" disabled={isLoading} className="form__button form__button--calcel">Corrigir</button>
          </div>

        </form>

      </div>

    </main>
  );
};


export default InvoiceOutAdd;