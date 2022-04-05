import React, {useState, useEffect} from "react";

import '../../customer/customerAdd/customerAdd.css';
import { Bill } from "../../../data/Bill";
import { useHistory } from "react-router-dom";
import { db, auth } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function NewBillToPay() {

  const history = useHistory();

  const [ hasInstallment, setHasInstallment ] = useState(false);
  const [ supplierData, setSupplierData ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( false );

  const [ installment, setInstallment ] = useState(
    {
      installmentAmountPay: "",
      dueDate: '',          
      receiptFile: "",
      paymentDate: "",
      amountPaid: "",
      paymentType: "boleto",
      installment: "1",
      paymentStatus: "toPay"
    }
  )

  const [ data, setData ] = useState(
    {
      id: "",
      name: "",
      supplierNumber: "",
      billType: "pay",
      documentNumber: "",
      billFile: "",
      additionalInformation: "",
      expenseType: "fixa",
      amountPay: "",
      currentPaymentDate: "",
  
      paymentInfo: {
        installments: "1",
        installmentsData: []
      }
    }
  )

  const [ billFileData, setBillFileData ] = useState( null );

  useEffect( async () => {

    const dataCollectionRef = collection( db, `users/${auth.currentUser.uid}/suppliers` );
    const queryResult = query( dataCollectionRef, orderBy("id") );
    const docSnap = await getDocs( queryResult );

    setSupplierData( docSnap.docs.map( doc => ( {...doc.data()} ) ) );
  }, []);

  const handleOnChangeInformation = (id) => (e) => {
    
    if ( id === 'dueDate' ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setInstallment( { ...installment, [id]: `${new Date( formatedDate )}` } );
      setData( { ...data, "currentPaymentDate": `${new Date( formatedDate )}` } );
    }

    else if ( id === 'amountPay' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setData( { ...data, [id]: amount } );
    }

    else if ( id === 'paymentType' ) {
      setInstallment( { ...installment, [id]: e.target.value } );
    }

    else if ( id === 'installments' ) {
      let paymentInfo = {
        installments: `${e.target.value}`,
        installmentsData: [] 
      }

      setData( { ...data, 'paymentInfo': paymentInfo } )
    }

    else if ( id === 'billFile' ) {
      
      if ( e.target.files[0] ) {
        setData( { ...data, [id]: e.target.files[0]['name'] } );
      
        let data2 = {
          file: e.target.files[0],
          fileID: id
        }
        setBillFileData( data2 );
      } 
      else {
        setData( { ...data, [id]: '' } );
        setBillFileData( null );
      }
    }

    else if ( id === "supplierNumber" ) {

      if ( e.target.value !== "choose" ) {
        let supplierData2 = supplierData.filter( ( data ) => data['id'] === parseInt( e.target.value ) )[0];
  
        setData({ ...data, 
          "supplierNumber": e.target.value,
          "name": supplierData2['responsable'],
         })
      }
      else {
        setData( {...data, 
          "supplierNumber" : e.target.value,
          "name": "",
         });

      }

    }

    else{
      setData( { ...data, [id]: e.target.value } );
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
        paymentType: `${installment['paymentType']}`,
        installment: `${i + 1}`,
        paymentStatus: "toPay"
      }
    
      let date = new Date( installment['dueDate'] )
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

    if ( billFileData ) {
      return billFileData;
    }
    else {
      return false;
    }
  }


  const handleAddInformation = async ( e ) => {
    e.preventDefault();
    setIsLoading( true );

    const finalData = unifyData()
    const bill = new Bill( { data: finalData, billType: finalData['billType'], file: checkIfFileHasChanged() } );

    const result = await bill.addBillToFirebase();

    if ( result ) {
      alert( "Conta a ser paga cadastrada com sucesso" )
      history.push("/financeiro/pagar")
    }
    else {
      alert( "Algo deu errado ao salvar as informações, por favor verifique todas as informações." );
      setIsLoading( false );
    }
    
  }

  const installmentElements = () => setHasInstallment( !hasInstallment )

  const renderInstallment = () => {
    if ( hasInstallment ){

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
            <label className="form__input--label"> Número de Parcelas no valor de R$ { amountPerInstallment }</label>
            <input className="form__input" type="number" required placeholder="Informe o nº de parcelas" min="1" onChange={handleOnChangeInformation('installments')}/>
          </div>
        </>
        );
    }
    else {
      return <></>
    }


  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Contas a Pagar</h4>
      </div>

      <div className="form__content">
        <form onSubmit={handleAddInformation}>
          <div className="form__content--inputs">

            <div className="form__input--halfWidth">
              <label className="form__input--label">Código do Fornecedor</label>
              <select name="forcedorID" className="form__input" value={data['supplierNumber']} onChange={handleOnChangeInformation('supplierNumber')} required>
              <option value="choose">Escolha o fornecedor, se houver</option>
              {
                supplierData.map( (data2, key) => {
                  return (<option value={data2['id']} key={key}>{data2['id']} - {data2['responsable']}</option>);
                })
              }
              </select>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Nome da Empresa*</label>
              <input className="form__input" type="text" placeholder="Nome da empresa" value={data['name']} onChange={handleOnChangeInformation('name')} required/>
            </div>


            <div className="form__input--halfWidth">
              <label className="form__input--label">Data de Vencimento*</label>
              <input className="form__input" type="date" required onChange={handleOnChangeInformation('dueDate')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Valor da Conta*</label>
              <input className="form__input" type="number" min="1" step=".01" placeholder="Informe o valor da conta" required onChange={handleOnChangeInformation('amountPay')}/>
            </div>

            <div className="form__input--halfWidth">
            <label className="form__input--label">Formas de Pagamento</label>
              <select name="forma-pagamento" className="form__input" defaultValue={installment.paymentType} onChange={handleOnChangeInformation('paymentType')}>
                  <option value="boleto">Boleto</option>
                  <option value="cheque">Cheque</option>
                  <option value="deposito">Depósito</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="pix">PIX</option>
                  <option value="transferencia">Transferência</option>   
              </select>  
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Número do Documento</label>
              <input className="form__input" type="text" placeholder="Informe o nº do documento" onChange={handleOnChangeInformation('documentNumber')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Tipo de Despesa</label>
              <select name="forma-pagamento" className="form__input" defaultValue={data.expenseType} onChange={handleOnChangeInformation('expenseType')}>
                <option value="fixa">Fixa</option>
                <option value="folhaPagamento">Folha de Pagamento</option>
                <option value="impostos">Impostos</option>
                <option value="bancaria">Bancária</option>
                <option value="produto">Produto</option>
                <option value="servico">Serviço</option>   
                <option value="alimentacao">Alimentação</option>   
              </select>  
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Arquivo da Conta</label>
              <input className="form__input" type="file" placeholder="Arquivo" onChange={handleOnChangeInformation('billFile')}/>
            </div>

            <div className="form__input--halfWidth">
              <label className="form__input--label">Parcelas</label>
              <select name="forma-pagamento" className="form__input" defaultValue="nao" onChange={installmentElements} >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
              </select>  
            </div>

            
            { renderInstallment() }

            <div className="form__input--fullWidth">            
              <label className="form__input--label">Informações adicionais</label>
              <textarea className="form__input" rows="4" onChange={handleOnChangeInformation('additionalInformation')}></textarea>          
            </div>

          </div>

          <div className="form__container--buttons">
            <button disabled={isLoading} className="form__button form__button--add">Adicionar</button>
            <button type="reset" disabled={isLoading} className="form__button form__button--cancel">Corrigir</button>
          </div>

        </form>
      </div>
      
    </main>
    )
  }