import {React, useState, useEffect} from 'react';
import CustomTextField from "../../../components/CustomTextField";
import CustomFormControl from "../../../components/CustomFormControl";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import ptBrLocate from "date-fns/locale/pt-BR"

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import './billsInfo.css';
import { Bill } from "../../../data/Bill";
import { storage, bucketName } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function BillsPayInfo( props ) {

  const [ data, setData ] = useState( '' );
  const [ idRef, setIdRef ] = useState( '' );
  const [ hasInstallment, setHasInstallment ] = useState( false );
  const [ valuesInstallmentData, setValuesInstallmentData ] = useState( '' );
  const [ updateButton, setUpdateButton ] = useState( false );


  useEffect( () => {

    let billID = props.match.params.id;

    if ( !data ) {
      fetchUserData( billID )
    }

  }, []);

  const fetchUserData = async ( id ) => {

    setIdRef( id )
    let billData = JSON.parse( localStorage.getItem( 'billInfo' ) );

    if ( billData ) {

      if ( toString( billData['id'] ) !== toString( id ) ) {

        console.log( "Feching data from firebase" )

        const bill = new Bill( { id: id, billType: "pay" } )
        const billData = await bill.getBillFromFirebase();

        if ( billData ) {
          setData( billData );
          setHasInstallment( billData['paymentInfo']['installments'] === "1"? false : true );
          const firstInstallment = billData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
          setValuesInstallmentData( firstInstallment );
        }
        else {
          alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
          window.close();
        }
 
      }
      else {
        setData( billData );
        setHasInstallment( billData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = billData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0];
        setValuesInstallmentData( firstInstallment );
      }
    } 
    else {
      console.log( "Feching data from firebase after updating" )
  
      const bill = new Bill( { id: id, billType: "pay" } );
      const billData = await bill.getBillFromFirebase();

      if ( billData ) {
        setData( billData );
        setHasInstallment( billData['paymentInfo']['installments'] === "1"? false : true );
        const firstInstallment = billData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0]
        setValuesInstallmentData( firstInstallment );
      }
      else {
        alert( "Desculpe, houve algum erro ao carregar as informações, tente novamente." )
        window.close();
      }
    }

  }

  const handleOnChangeInformation = (id) => (e) => {

    setData( { ...data, [id]: e.target.value } );

    if ( !updateButton ) {
      setUpdateButton( true );
    }
  }

  const renderInstallment = () => {

    var totalPaid = 0;

    if ( hasInstallment ) {

      let renderIntalmentsInfo = data['paymentInfo']['installmentsData'].map( ( installmentInfo, index ) => {

        installmentInfo['paymentStatus'] === 'paid' ? totalPaid += parseFloat(installmentInfo.amountPaid) : totalPaid += 0;
  
        return(
          <>
            <h3 className="renderInstallments__container--title">Informaçãoes da parcela: { installmentInfo['installment'] }</h3>
            <div key={installmentInfo.installment} className="renderInstallments__container" >

              <div className="form__input--halfWidth">
                <CustomTextField  
                  id="amountPay"
                  label={ `Valor da parcela ${installmentInfo.installment} / ${data.paymentInfo.installments}` }
                  disabled
                  variant="outlined" 
                  defaultValue={installmentInfo.installmentAmountPay}
                  InputProps={
                    {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                  }
                />
              </div>

              <div className="form__input--halfWidth">
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
                  <DatePicker
                    label="Data de vencimento"
                    id="dueDate"
                    disabled
                    value={ installmentInfo.dueDate }
                    inputFormat="dd/MM/yyyy"
                    onChange={ (newValue) => {}}
                    renderInput={(params) => <CustomTextField {...params}/>}
                  />
                </LocalizationProvider>
              </div>

              <div className="form__input--halfWidth">
              <CustomFormControl>
                <InputLabel id="paymentStatus-label">Status do Pagamento</InputLabel>

                <Select
                  labelId="paymentStatus-label"
                  id="paymentStatus"
                  value={installmentInfo.paymentStatus}
                  label="Status do Pagamento"
                  disabled
                >

                  <MenuItem value='toPay'>A Pagar</MenuItem>
                  <MenuItem value='paid'>Pago</MenuItem>
                  <MenuItem value='toReceive'>A Receber</MenuItem>
                  <MenuItem value='received'>Recebido</MenuItem>
                </Select>

              </CustomFormControl>
              </div>

              { installmentInfo.paymentDate === "" ? <></> : 
                <div className="form__input--halfWidth">
                  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
                    <DatePicker
                      label="Data de Pagamento"
                      id="paymentDate"
                      disabled
                      value={ installmentInfo.paymentDate }
                      inputFormat="dd/MM/yyyy"
                      onChange={ (newValue) => {}}
                      renderInput={(params) => <CustomTextField {...params}/>}
                    />
                  </LocalizationProvider>
                </div>
              }

              { installmentInfo.amountPaid === "" ? <></> : 
                <div className="form__input--halfWidth">
                  <CustomTextField  
                    id="amountPaid"
                    label="Valor Pago"
                    disabled
                    variant="outlined" 
                    value={installmentInfo.amountPaid}
                    InputProps={
                      {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                    }
                  />
                </div>
              }

              { installmentInfo.paymentStatus !== "paid" ? <></> :
                <div className="form__input--halfWidth">
                  <CustomTextField
                    id="receiptFile"
                    label="Comprovante"
                    variant="outlined"
                    disabled
                    value={ installmentInfo.receiptFile === '' ? "Não disponivel" : installmentInfo.receiptFile }
                    onClick={ () => {

                      if( installmentInfo.receiptFile !== '' ) {
                        let gsReference = getDownloadURL( ref( storage, `gs://${bucketName}/bills_pay/${idRef}/receiptFile/${installmentInfo.installment}/${installmentInfo.receiptFile}`) )
                          .then( data => window.open( data, '_blank', 'noopener,noreferrer') );
                      }

                    }}
                  />
                </div>
              }
            </div>
          </>
        );

      })

      return(
        <>
          {renderIntalmentsInfo}

          <h3 className="renderInstallments__container--title">Total pago: R$ { totalPaid }</h3>
          <h3 className="renderInstallments__container--title">Saldo a pagar: R$ { parseFloat( data.amountPay ) - totalPaid }</h3>
        </>
      );
    }
    else {
      return <></>
    }
  }

  const renderUpdateButton = () => {

    if ( updateButton ) {
      return(      
        <div className='bill_button--container'>
          <button onClick={handleSubmit} className="userUpdateButton">Atualizar</button>
        </div>
      );
    } else return <></>
  }

  const handleSubmit = async ( e ) => {

    e.preventDefault();

    const bill = new Bill( { data: data, id: idRef, billType: "pay" } )
    const result = await bill.updateBillOnFirebase();

    if ( result ) {
      alert( "Conta atualizada com sucesso" )
      localStorage.removeItem( 'billInfo' )
      window.location.reload()
    }

    else {
      alert( "Algo deu errado ao atualizar as informações. Por favor verifique todas as informações e tente novamente." )
    }
  }

  return (
  
    <main className="form__container">

      <div className="form__title">
        <h4>Informações do Pagamento</h4>
      </div>

      <div className="form__content">
        
        <div className="form__content--inputs">

          <div className="form__input--halfWidth">
            <CustomTextField
              id="name"
              label="Empresa"
              disabled
              variant="outlined" 
              value={ data === '' ? '' : data.name }
            />
          </div>

          <div className="form__input--halfWidth">
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
              <DatePicker
                label="Data de vencimento"
                id="dueDate"
                disabled
                value={ valuesInstallmentData.dueDate }
                inputFormat="dd/MM/yyyy"
                onChange={ (newValue) => {}}
                renderInput={(params) => <CustomTextField {...params}/>}
              />
            </LocalizationProvider>
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField  
              id="amountPay"
              label={ data.billType === "paid" ? "Valor Total a Pagar" : "Valor Total a Receber"}
              disabled
              variant="outlined" 
              value={data.amountPay}
              InputProps={
                {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
              }
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Formas de pagamento</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="paymentType"
                value={ valuesInstallmentData === '' ? '' : valuesInstallmentData.paymentType }
                label="Formas de pagamento"
                disabled
              >

                <MenuItem value='boleto'>Boleto</MenuItem>
                <MenuItem value='pix'>PIX</MenuItem>
                <MenuItem value='transferencia'>Transferência</MenuItem>
                <MenuItem value='deposito'>Depósito</MenuItem>
                <MenuItem value='cheque'>Cheque</MenuItem>
                <MenuItem value='dinheiro'>Dinheiro</MenuItem>
              </Select>

            </CustomFormControl>
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              id="documentNumber"
              label="Número do documento"
              variant="outlined" 
              value={ data === '' ? '' : data.documentNumber}
              disabled
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Tipo de despesa</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="expenseType"
                value={ data === '' ? '' : data.expenseType }
                label="Tipo de despesa"
                disabled
              >
                
                <MenuItem value="fixa">Fixa</MenuItem>
                <MenuItem value="folhaPagamento">Folha de Pagamento</MenuItem>
                <MenuItem value="impostos">Impostos</MenuItem>
                <MenuItem value="bancaria">Bancária</MenuItem>
                <MenuItem value="produto">Produto</MenuItem>
                <MenuItem value="servico">Serviço</MenuItem>   
                <MenuItem value="alimentacao">Alimentação</MenuItem>   

              </Select>

            </CustomFormControl>
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              id="billFile"
              label="Arquivo da conta"
              variant="outlined" 
              disabled
              value={ data.billFile === '' ? "Não disponivel" : data.billFile }
              onClick={ () => {
                if( data.billFile !== '' ) {
                  let gsReference = getDownloadURL( ref( storage, `gs://${bucketName}/bills_pay/${idRef}/billFile/${data.billFile}`) )
                    .then( data => window.open( data, '_blank', 'noopener,noreferrer') );
                  }
              }}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="hasInstallment-label">Parcelas</InputLabel>

              <Select
                labelId="hasInstallment-label"
                id="paymentType"
                value={hasInstallment}
                label="Parcelas"
                disabled
              >
                <MenuItem value={true}>Sim - nº {  data === '' ? '' : data['paymentInfo']['installments'] }</MenuItem>
                <MenuItem value={false}>Não</MenuItem>
              </Select>

            </CustomFormControl>
          </div>

          
          { renderInstallment() }

          <div className="form__input--fullWidth">
            <CustomTextField
              id="additionalInformation"
              label="Informações adicionais"
              multiline
              value={ data === '' ? '' : data.additionalInformation }
              rows={4}
              onChange={handleOnChangeInformation('additionalInformation')}
            />
          </div>

          { renderUpdateButton() }

        </div>

      </div>
      
    </main>
  );
}