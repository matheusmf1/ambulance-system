import { React, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Invoice } from '../../../data/Invoice';
import { storage, bucketName } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Fab } from "@material-ui/core";

const InvoiceOutInfo = props => {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ invoiceFileData, setInvoiceFileData ] = useState( null );
  
  const history = useHistory();

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);

  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let fetchData = JSON.parse( localStorage.getItem( 'invoiceInfo' ) );

    console.log( fetchData )

    if ( fetchData ) {

      if ( fetchData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const invoice = new Invoice( { id: id } )
        const invoiceData = await invoice.getInvoiceFromFirebase();

        if ( invoiceData ) {
          setData( invoiceData )
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( fetchData )
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const invoice = new Invoice( { id: id } )
      const invoiceData = await invoice.getInvoiceFromFirebase();

      if ( invoiceData ) {
        setData( invoiceData )
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const handleInformationChange = ( id ) => ( e ) => {

    if ( id === 'invoice_file' ) {
      
      if ( e.target.files[0] ) {
        setData( { ...data, [id]: e.target.files[0]['name'] } );
      
        let data2 = {
          file: e.target.files[0], 
        }
        setInvoiceFileData( data2 );
      } 
      else {
        setData( { ...data, [id]: '' } );
        setInvoiceFileData( null );
      }
    }
    
    else {
      setData( { ...data, [id]: e.target.value } )
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

    console.log( data )

    if ( data['invoice_file'] === "" ) {
      alert( "Por favor selecione um arquivo para a nota fiscal" );
    }

    else {       
      
      const invoice = new Invoice( { data: data, id: idRef, file: checkIfFileHasChanged() } );
      const result = await invoice.updateInvoiceOnFirebase();

      if ( result ) {
        alert( "Nota Fista atualizada com sucesso" );
        localStorage.removeItem( "invoiceInfo" );
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
        <h4>{ `Nota Fiscal de Saída - ${data['id']}` }</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>

          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Cliente</label>
              <input className="form__input" type="text" value={data['customer_id']} placeholder="Fornecedor" disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número da nota</label>
              <input className="form__input" type="text" placeholder="Número da nota" value={ data['id'] } disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Emissão</label>
              <input className="form__input" type="date" value={ data.invoice_issueDate ? new Date( data.invoice_issueDate ).toISOString().split("T")[0] : '' } disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor da nota - (R$)</label>
              <input className="form__input" type="number" step=".01" placeholder="Informe o valor" min={0} value={ data['invoice_value'] } disabled/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Serviço</label>
              <select name="forma-pagamento" className="form__input" value={data['invoice_service']} disabled>
                <option value="transformationProposal">Proposta</option>
                <option value="serviceOrder">Ordem de Serviço</option>
                <option value="productSale">Venda de Produto</option>
              </select>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número do Serviço do Cliente</label>
              <input className="form__input" type="text" value={ data['invoice_serviceID'] } disabled/>
            </div>


            <div className="form__input--halfWidth" onClick={ () => {
              if ( data['invoice_file'] !== '' ) {
                let gsReference = getDownloadURL( ref( storage, `gs://${bucketName}/invoices/${data['invoice_type']}/${data['id']}/${data['invoice_file']}`) )
                  .then( data => window.open( data, '_blank', 'noopener,noreferrer') );        
              }
              }}>
              <label className="form__input--label">Arquivo da nota*</label>
              <input className="form__input" type="text" value={ data['invoice_file'] !== "" ? data['invoice_file'] : "Nenhum arquivo selecionado" } disabled/>
            </div>


            <div className="form__input--halfWidth">
              <label className="form__input--label">Alterar Arquivo</label>
              <label htmlFor="upload-file">
                <input
                  style={{ display: "none" }}
                  id="upload-file"
                  name="upload-file"
                  type="file"
                  onChange={handleInformationChange('invoice_file')}
                />
                
                <Fab
                  className='modal__upload--button'
                  component="span"
                  aria-label="add"
                  variant="extended"
                >

                <FileUploadIcon /> Substituir
                </Fab>
              </label>

            </div>



            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" value={ data['invoice_moreInfo'] } onChange={handleInformationChange('invoice_moreInfo')}></textarea>          
            </div>

          </div>
          
          <div className="form__container--buttons">
            <button type="submit" className="form__button form__button--add">Atualizar</button>
          </div>

        </form>

      </div>

    </main>
  );
};

export default InvoiceOutInfo;