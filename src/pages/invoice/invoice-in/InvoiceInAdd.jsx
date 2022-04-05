import { React, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Invoice } from '../../../data/Invoice';

const InvoiceInAdd = props => {

  const [ suppliersData, setSuppliersData ] = useState( [] );
  const [ invoiceFileData, setInvoiceFileData ] = useState( null );
  const [ invoiceData, setInvoiceData ] = useState(
    {
      id: "",
      invoice_type: "invoice_in",
      supplier_id: "choose",
      invoice_issueDate: "",
      invoice_value: "",
      invoice_file: "",
      invoice_moreInfo: "",
    }
  );

  const history = useHistory();

  useEffect( async () => {

    const supplierCollectionRef = collection( db, `users/${auth.currentUser.uid}/suppliers` );
    const queryResult = query( supplierCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    setSuppliersData( docSnap.docs.map( doc => ( {...doc.data()} ) ) );
  }, []);


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
          file: e.target.files[0], 
        }
        setInvoiceFileData( data2 );
      } 
      else {
        setInvoiceData( { ...invoiceData, [id]: '' } );
        setInvoiceFileData( null );
      }
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

    if ( invoiceData['supplier_id'] === "choose" ) {
      alert( "Informe todas as informações necessárias!" );
    }
    else {
      
      const invoice = new Invoice( { data: invoiceData, id: invoiceData['id'], file: checkIfFileHasChanged() } );
      const result = await invoice.addInvoiceToFirebase();

      if ( result ) {
        alert( "Nota Fista cadastrada com sucesso" )
        history.push( "/nota-fiscal/entrada" );
      }
      else {
        alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
      }
    }
    
  }



  return (
    <main className="form__container">

      <div className="form__title">
        <h4>Cadastrar Nota Fiscal de Entrada</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

          <div className="form__input--halfWidth">
            <label className="form__input--label">Fornecedor*</label>
            <select name="estados-brasil" className="form__input" value={invoiceData['supplier_id']} onChange={handleInformationChange('supplier_id')} required>
              <option value="choose">Escolha o Fornecedor</option>

                {
                  suppliersData.map( (data, key) => {
                    return (<option value={data['id']} key={key}>{data['id']} - {data['responsable']}</option>);
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

            <div className="osForm__input">
              <label className="form__input--label">Arquivo da nota*</label>
              <input className="form__input" type="file" onChange={handleInformationChange('invoice_file')} required/>
            </div>

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleInformationChange('invoice_moreInfo')}></textarea>          
            </div>

          </div>
          
          <div className="form__container--buttons">
            <button type="submit" className="form__button form__button--add">Adicionar</button>
            <button type="reset" className="form__button form__button--calcel">Corrigir</button>
          </div>

        </form>

      </div>

    </main>
  );
};


export default InvoiceInAdd;