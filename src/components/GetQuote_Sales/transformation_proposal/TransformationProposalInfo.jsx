import { React, useState, useEffect } from 'react';
import logoRescue from '../../../assets/images/logo-rescue.png';
import InputCpfCnpj from '../../inputs/input--cpfCnpj';
import InputPhoneNumber from '../../inputs/input--phoneNumber';
import InputCep from '../../inputs/input--cep';
import { TransformationProposal } from "../../../data/TransformationProposal";
import { useHistory } from "react-router-dom";
import { storage, bucketName } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Fab } from "@material-ui/core";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import '../service_order/newServiceOrder/newServiceOrder.css';

export default function TransformationProposalInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ hasInstallment, setHasInstallment ] = useState( false );
  const [ valuesInstallmentData, setValuesInstallmentData ] = useState( '' );
  const [ serviceFileData, setServiceFileData ] = useState( null );
  
  const history = useHistory();
  const pathName = props.match.url;
  const sessionName = pathName.split( "/" )[1];

  useEffect( () => {

    let userID = props.match.params.id;

    if ( !data ) {
      fetchUserData( userID )
    }

  }, []);


  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let serviceData = JSON.parse( localStorage.getItem( 'quoteSalesInfo' ) );

    if ( serviceData ) {

      if ( serviceData['id'].toString() !== id.toString() ) {

        console.log( "Feching data from firebase" )

        const service = new TransformationProposal( { id: id } )
        const serviceData = await service.getTransformationProposalFromFirebase();

        if ( serviceData ) {
          setData( serviceData )
          setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
          const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
          setValuesInstallmentData( firstInstallment );
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( serviceData )
        setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
        setValuesInstallmentData( firstInstallment );
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const service = new TransformationProposal( { id: id } )
      const serviceData = await service.getTransformationProposalFromFirebase();

      if ( serviceData ) {
        setData( serviceData )
        setHasInstallment( serviceData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = serviceData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
        setValuesInstallmentData( firstInstallment );
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const checkCep = ( e ) => {

    let cep = e.target.value.replace( /\D/g, '' );
    setData( { ...data, "cep": cep } );

    if ( cep.length === 8 ) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then( response => {
        if (response.ok)
          return response.json()
      })
      .then( dataCep => {
        if ( dataCep.erro ) {
          throw new Error( "Não foi possível encontrar o CEP informado, por favor tente novamente" )
        }
        else {
          setData( { ...data, "cep": cep, "address": dataCep['logradouro'], "neighborhood": dataCep['bairro'], "city": dataCep['localidade'], "state": dataCep['uf'] } );
        }
      })
      .catch( error => {
        console.error( error )
        alert( 'Não foi possível encontrar o CEP informado, por favor tente novamente' )
      })
    }
  }

  const defineStatusFieldOptions = () => {
    
    if ( sessionName === 'venda' ) {
      return (
        <select className="form__input" value={data['status']} onChange={handleInformationChange( 'status' )}>
          <option value="cancelado_naoAprovado">Cancelado</option>
          <option value="aprovado">Aprovado Orçamento</option>
          <option value="emAndamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
        </select>       
      );
    }

    else if ( sessionName === 'orcamento' ) {
      return (
        <select className="form__input" value={data['status']} onChange={handleInformationChange( 'status' )}>
          <option value="cancelado_naoAprovado">Não Aprovado</option>
          <option value="aprovado">Aprovado</option>
        </select>       
      );
    }
  }

  const installmentElements = () => setHasInstallment( !hasInstallment )

  const renderInstallment = () => {
    
    if ( hasInstallment ) {

      let totalAmount = data['amountPay']
      if ( isNaN(totalAmount) ) {
        totalAmount = 0
      }
      
      let installmentsNumber = data[ 'paymentInfo']['installments']
      let amountPerInstallment = parseFloat( 0 ).toFixed(3).slice(0, -1)
      if ( installmentsNumber > 0 ) {
        amountPerInstallment = parseFloat( totalAmount / installmentsNumber ).toFixed(3).slice(0, -1)
      }

      return(
        <>
          <div className="form__input--halfWidth">
            <label className="form__input--label"> Número de Parcelas:</label>
            <input className="form__input" type="number" required placeholder="Informe o nº de parcelas" min="1" value={ parseInt(data['paymentInfo']['installments'])} onChange={handleInformationChange('installments')}/>
          </div>

          <div className="form__input--halfWidth">
            <label className="form__input--label"> Valor de cada parcela:</label>
            <input className="form__input" type="text" disabled value={`R$ ${amountPerInstallment}`}/>
          </div>
        </>
        );
    }
    else {
      return <></>
    }

  }

  const handleInformationChange = (id) => ( e ) => {

    if ( id === "entryDate" || id === "dueDate" || id === "outputDate" ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )

      if ( id === "entryDate" || id === "outputDate" )
        setData( { ...data, [id]: `${new Date( formatedDate )}` } );
      
      else
        setValuesInstallmentData( { ...valuesInstallmentData, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'paymentType' ) {
      setValuesInstallmentData( { ...valuesInstallmentData, [id]: e.target.value } );
    }

    else if ( id === 'installments' ) {
      let paymentInfo = {
        installments: `${e.target.value}`,
        installmentsData: [] 
      }

      setData( { ...data, 'paymentInfo': paymentInfo } )
    }

    else if ( id === 'information_file' ) {
      
      if ( e.target.files[0] ) {
        setData( { ...data, [id]: e.target.files[0]['name'] } );
      
        let data2 = {
          file: e.target.files[0],
          fileID: id
        }
        setServiceFileData( data2 );
      } 
      else {
        setData( { ...data, [id]: '' } );
        setServiceFileData( null );
      }
    }

    else {
      setData( {...data, [ id ]: e.target.value } )
    }

  }

  const unifyData = () => {

    const totalInstallments = parseInt( data['paymentInfo']['installments'] )
    let installmentAmountPay = 0
    if ( totalInstallments !== 0 ) {
      installmentAmountPay = parseFloat( data['amountPay'] / totalInstallments ).toFixed(3).slice(0, -1)
    }

    const installmentDataArray = []
    for ( let i = 0; i < totalInstallments; i++ ) {
      
      let installmentBody = {
        installmentAmountPay: `${ installmentAmountPay }`,
        dueDate: '',          
        receiptFile: '',
        paymentDate: '',
        amountPaid: "",
        paymentType: `${valuesInstallmentData['paymentType']}`,
        installment: `${i + 1}`,
        paymentStatus: "toPay"
      }
    
      let date = new Date( valuesInstallmentData['dueDate'] )
      let day = parseInt(date.getDate())
      let month = parseInt(date.getMonth()) + 1
      let year = parseInt(date.getFullYear())
      
      let correntInstallmentMonth = month + i
    
      if ( correntInstallmentMonth > 12 ) {
        correntInstallmentMonth = correntInstallmentMonth - 12
        year = year + 1
      }

      let lastDayCurrentInstallmentMonth = new Date( year, correntInstallmentMonth, 0).getDate();

      if ( day > lastDayCurrentInstallmentMonth ) {
        day = lastDayCurrentInstallmentMonth
      }

      let installmentDate = new Date(`${year}/${correntInstallmentMonth}/${day}`)
      installmentBody['dueDate'] = `${installmentDate}`
      installmentDataArray.push( installmentBody )
    }

    let paymentInfo = {
      installments: `${totalInstallments}`,
      installmentsData: installmentDataArray
    }

    data['paymentInfo'] = paymentInfo 
    
    return data

  }

  const checkIfFileHasChanged = () => {

    if ( serviceFileData ) {
      return serviceFileData;
    }
    else {
      return false;
    }
  }

  const handleSubmit = async ( e ) => {
    e.preventDefault()

    const finalData = unifyData();
    console.log( finalData )

    const transformationProposal = new TransformationProposal( { data: finalData, id: idRef, file: checkIfFileHasChanged() } );
    const result = await transformationProposal.updateTransformationProposalOnFirebase();

    if ( result ) {
      alert( "Proposta de Transformação atualizada com sucesso" )
      localStorage.removeItem( 'quoteSalesInfo' )
      history.push( `/${sessionName}s` )
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." )
    }
    
  }

  const renderFileLinkOrInput = () => {

    if ( data['information_file'] !== '' ) {

      return (
        <>
          <div className="osForm__input" onClick={ () => {
            let gsReference = getDownloadURL( ref( storage, `gs://${bucketName}/orcamento_venda_transformationProposal/${idRef}/information_file/${data['information_file']}`) )
            .then( data => window.open( data, '_blank', 'noopener,noreferrer') );
          }}>
            <label className="form__input--label">Arquivo</label>
            <input className="form__input cursor__pointer" type="text" value={ data['information_file'] } disabled />
          </div>

          <div className="osForm__input">
            <label className="form__input--label">Alterar Arquivo</label>
            <label htmlFor="upload-file">
              <input
                style={{ display: "none" }}
                id="upload-file"
                name="upload-file"
                type="file"
                onChange={ handleInformationChange('information_file') }
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
        </>      
      );
    }
    else {

      return(
        <div className="osForm__input">
          <label className="form__input--label">Arquivo</label>
          <input className="form__input" type="file" onChange={handleInformationChange('information_file')}/>
        </div>
      );
    }
  }

  return (
  
    <main className="form__container">
      
      <h4 className="os__container--title">Nova Proposta de Tranformação</h4>

      {/* HEADER */}
      <div className="os__header--container">

        <div className="os__header--containerImage">
          <img src={logoRescue} alt="" className="os__header--image" />

          <div className="os__header--content">

            <h6>Rescue Transformação de veículos especiais Eireli</h6>

            <h6 className="info">CNPJ: 33.972.355/0001-00</h6>
            <h6 className="info">Rua Machado, 55 Vila Sorocabana</h6>
            <h6 className="info">Guarulhos/SP - CEP: 07025-210</h6>

          </div>

        </div>
        
        <div className="os__header--content">

          <h6 className="info">(11) 2847-0356 - (11) 95651-2030</h6>
          <h6 className="info">adm@rescueveiculosespeciais.com.br</h6>
          <h6 className="info">www.rescueveiculosespeciais.com.br</h6>

          <div className='os__header--responsableInfo'>
            <h6 className="info">Responsável:</h6>
            <input className='os__header--responsableInput' type="text" value={ data['responsable'] } onChange={handleInformationChange('responsable')}/>
          </div>
        </div>

      </div>

      <div className="form__content">
        <form onSubmit={handleSubmit}>
          <div className="form__content--inputs">

            {/* INFO INICIAL */}
            <div className="osForm__content--container">

              <div className="osForm__titleWithDate--container">

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">{`Proposta de Transformação ${data['id']}`}</label>
                </div>

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Entrada</label>        
                  <input className="osForm__input--date" type="date" value={ data.entryDate ? new Date( data.entryDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('entryDate')} required />
                </div>

              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Código do Cliente*</label>
                <input className="form__input" type="text" placeholder="Nome do responsável" value={data.clientNumber} onChange={handleInformationChange('clientNumber')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">OPÇÃO DE BUSCAR CLIENTE</label>
                <input className="form__input" type="text" placeholder="Nome do responsável"/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Empresa*</label>
                <input className="form__input" type="text" placeholder="Nome da empresa" value={data.companyName} onChange={handleInformationChange('companyName')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">CNPJ/CPF*</label>
                <InputCpfCnpj onChange={handleInformationChange('cpf')} defaultValue={data.cpf} required={true}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">CEP*</label>
                <InputCep onChange={checkCep} defaultValue={data.cep}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Endereço*</label>
                <input className="form__input" type="text" placeholder="Informe o endereço" value={data['address']} onChange={handleInformationChange('address')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Cidade*</label>
                <input className="form__input" type="text" placeholder="Informe a Cidade" value={data['city']} onChange={handleInformationChange('city')} required/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Estado*</label>
                <select name="estados-brasil" className="form__input" value={data['state']} onChange={handleInformationChange('state')}>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                </select>              
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Email*</label>
                <input className="form__input" type="email" placeholder="Endereço de email" value={data['email']} onChange={handleInformationChange('email')}/>
              </div>

              <div className="form__input--halfWidth">
                <label className="form__input--label">Telefone*</label>
                <InputPhoneNumber placeholder="Informe o número de telefone" mask="(99) 9999-9999" defaultValue={ data['telephone'] } onChange={handleInformationChange('telephone')}/>
              </div>
            </div>


            {/* INFORMACOES  */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Informações</h6>
              
              <div className="osForm__input">
                <label className="form__input--label">Veículo*</label>
                <input className="form__input" type="text" placeholder="Veículo" value={ data['information_vehicle'] } onChange={handleInformationChange('information_vehicle')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Marca*</label>
                <input className="form__input" type="text" placeholder="Marca" value={ data['information_brand'] } onChange={handleInformationChange('information_brand')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Modelo*</label>
                <input className="form__input" type="text" placeholder="Modelo" value={ data['information_model'] } onChange={handleInformationChange('information_model')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Chassi*</label>
                <input className="form__input" type="text" placeholder="Chassi" value={ data['information_chassi'] } onChange={handleInformationChange('information_chassi')} required/>
              </div>

              { renderFileLinkOrInput() }

            </div>


            {/* DADOS PAGAMENTO */}
            <div className="osForm__content--container">
              <h6 className="os__content--title">Dados do Pagamento</h6>

              <div className="osForm__input">
                <label className="form__input--label">Vencimento*</label>
                <input className="form__input" type="date" placeholder="Vencimento" value={ valuesInstallmentData.dueDate ? new Date( valuesInstallmentData.dueDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('dueDate')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Valor Total*</label>
                <input className="form__input" type="number" min="1" step=".01" placeholder="Valor" value={ data['amountPay'] } onChange={handleInformationChange('amountPay')} required/>
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Formas de Pagamento*</label>
                <select name="forma-pagamento" className="form__input" value={ valuesInstallmentData.paymentType ? valuesInstallmentData.paymentType : '' } onChange={handleInformationChange('paymentType')}>
                  <option value="boleto">Boleto</option>
                  <option value="cheque">Cheque</option>
                  <option value="deposito">Depósito</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>   
                </select> 
              </div>

              <div className="osForm__input">
                <label className="form__input--label">Parcelas</label>
                <select name="forma-pagamento" className="form__input" value={ hasInstallment } onChange={installmentElements} >
                  <option value={true}>Sim</option>
                  <option value={false}>Não</option>
                </select>  
              </div>

               { renderInstallment() }

            </div>

           
            {/* ASSINATURA E DADOS BANCARIOS */}
            <div className="osForm__content--container">

              <div className="os__signatureField--container">
                <input className='os__header--responsableInput' type="text" value={ data['requestedBy'] } onChange={handleInformationChange('requestedBy')} required/>
                <h3 className="info">Solicitado por:</h3>
              </div>

              <div className="os__signatureBankInfo--content">

                <h6>DADOS BANCÁRIOS</h6>
                <h6 className="info">BANCO BRADESCO</h6>
                <h6 className="info">AG: 0593</h6>
                <h6 className="info">C/C: 20.867-1</h6>
                <h6 className="info">Rescue Transformação de veículos especiais Eireli</h6>
                <h6 className="info">CNPJ: 33.972.355/0001-00 (Chave PIX)</h6>

                <div className="osForm__titleWithDate--title">
                  <label className="form__input--labelInLine">Data Saída</label>
                  <input className="osForm__input--date" type="date" value={ data.outputDate ? new Date( data.outputDate ).toISOString().split("T")[0] : '' } onChange={handleInformationChange('outputDate')} required/>
                </div>

              </div>

            </div>

          </div>

          
         
          <div className="footer__button--container">
            
            <div className="footer__button--buttons">
              <button type="submit" className="form__button form__button--add">Atualizar</button>
            </div>

            <div className="footer__button--status">
              <label>STATUS</label>
              { defineStatusFieldOptions( ) }
            </div>    

          </div>

        </form>
      </div>

    </main>
    )
  }