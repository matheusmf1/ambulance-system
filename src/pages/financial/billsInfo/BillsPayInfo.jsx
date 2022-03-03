import React, {useState} from "react";

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

import './billsInfo.css'

export default function BillsPayInfo( props ) {

  let billID = props.match.params.id;
  console.log( typeof billID )
  console.log( billID )

  let billData = JSON.parse( localStorage.getItem('billInfo') );
  console.log( billData );

  if ( billData['id'] !== billID ) {

    console.log( "Fech data from firebase" )


  }


  const installmentsNumber = billData['paymentInfo']['installments']
  const firstInstallment = billData['paymentInfo']['installmentsData'].filter( data => data['installment'] === "1")[0]

  const [ hasInstallment, setHasInstallment ] = useState( installmentsNumber === "1"? false : true )

  const [ valuesInstallmentData, setValuesInstallmentData ] = useState({
    installmentAmountPay: `${firstInstallment.installmentAmountPay}`,
    dueDate: `${firstInstallment.dueDate}`,
    receiptFile: `${firstInstallment.receiptFile}`,
    paymentDate: `${firstInstallment.paymentDate}`,
    amountPaid: `${firstInstallment.amountPaid}`,
    paymentType: `${firstInstallment.paymentType}`,
    installment: `${firstInstallment.installment}`,
    paymentStatus: `${firstInstallment.paymentStatus}`
  });

  const [ data, setData ] = useState(
    {
      id: `${billData.id}`,
      name: `${billData.name}`,
      billType: `${billData.billType}`,
      documentNumber: `${billData.documentNumber}`,
      billFile: `${billData.billFile}`,
      additionalInformation: `${billData.additionalInformation}`,
      expenseType: `${billData.expenseType}`,
      amountPay:`${billData.amountPay}`,
  
      paymentInfo: {
        installments: `${billData['paymentInfo']['installments']}`,
        installmentsData: billData['paymentInfo']['installmentsData'],
      },
      
      service: `${billData.service}`,
      serviceNumber: `${billData.serviceNumber}`
    }
  )

  const handleOnChangeInformation = (id) => (e) => {
    
    if ( id === 'dueDate' ) {
      let formatedDate = (e.target.value).toString().replaceAll( "-", "/" )
      setValuesInstallmentData( { valuesInstallmentData, [id]: `${new Date( formatedDate )}` } );
    }

    else if ( id === 'amountPay' ) {
      let amount = parseFloat( e.target.value.toString() ).toFixed(2)
      setData( { ...data, [id]: amount } );
    }

    else if ( id === 'paymentType' ) {
      setValuesInstallmentData( { valuesInstallmentData, [id]: e.target.value } );
    }

    else if ( id === 'installments' ) {
      let paymentInfo = {
        installments: `${e.target.value}`,
        installmentsData: [] 
      }

      setData( { ...data, 'paymentInfo': paymentInfo } )
    }

    else{
      setData( { ...data, [id]: e.target.value } );
    }


  }

  const renderInstallment = () => {

    if ( hasInstallment ) {

      let renderIntalmentsInfo = data['paymentInfo']['installmentsData'].map( installmentInfo => {

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
                    onChange={ (newValue) => {
                      setValuesInstallmentData( { ...valuesInstallmentData, dueDate: `${new Date( newValue )}` } );
                    }} 
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
                      onChange={ (newValue) => {
                        setValuesInstallmentData( { ...valuesInstallmentData, dueDate: `${new Date( newValue )}` } );
                      }} 
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
                    defaultValue={installmentInfo.amountPaid}
                    InputProps={
                      {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                    }
                  />
                </div>
              }
            </div>
          </>
        );

      })

      return renderIntalmentsInfo
    }
    else {
      return <></>
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
              defaultValue={data.name}
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
                onChange={ (newValue) => {
                  setValuesInstallmentData( { ...valuesInstallmentData, dueDate: `${new Date( newValue )}` } );
                }} 
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
              defaultValue={data.amountPay}
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
                value={valuesInstallmentData.paymentType}
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
              defaultValue={data.documentNumber}
              disabled
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Tipo de despesa</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="expenseType"
                value={data.expenseType}
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
              defaultValue={data.billFile}
              disabled
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

                <MenuItem value={true}>Sim - nº { data['paymentInfo']['installments'] }</MenuItem>
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
              value={data.additionalInformation}
              rows={4}
              onChange={handleOnChangeInformation('additionalInformation')}
            />
          </div>

        </div>

      </div>
      
    </main>
    )
  }
