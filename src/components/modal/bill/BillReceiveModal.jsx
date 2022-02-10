import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

import CustomTextField from '../../CustomTextField';
import CustomFormControl from '../../CustomFormControl'

import ptBrLocate from "date-fns/locale/pt-BR"

import '../modal.css';

export default function BillReceiveModal( props ) {

  const { data,  installment } = props
  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const installmentData = data['paymentInfo']['installmentsData'].filter( data => data[ 'installment' ] === installment )[0]

  const [ valuesInstallmentData, setValuesInstallmentData ] = useState({
    installmentAmountPay: `${installmentData.installmentAmountPay}`,
    dueDate: `${installmentData.dueDate}`,
    receiptFile: `${installmentData.receiptFile}`,
    paymentDate: `${ new Date() }`,
    amountPaid: `${installmentData.amountPaid}`,
    paymentType: `${installmentData.paymentType}`,
    installment: `${installmentData.installment}`,
    paymentStatus: "received",
  });
  
  const [values, setValues] = useState({
    id: `${data.id}`,
    name: `${data.name}`,
    billType: `${data.billType}`,
    documentNumber: `${data.documentNumber}`,
    billFile: `${data.billFile}`,
    additionalInformation: `${data.additionalInformation}`,
    expenseType: `${data.expenseType}`,
    amountPay: `${data.amountPay}`,

    service: `${data.service}`,
    serviceNumber: `${data.serviceNumber}`,

    paymentInfo: {
      installments: `${data['paymentInfo'].installments}`,
      installmentsData: data['paymentInfo'].installmentsData,
    }
  });

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };
  
  const handleInstallmentInformation = ( id ) => ( e ) => {
    setValuesInstallmentData( { ...valuesInstallmentData, [id]: e.target.value } );
  }
  
  
  const handleOnChangeInformation = (id) => (e) => {
    setValues( { ...values, [id]: e.target.value } );
  }


  const handleSubmit = ( e ) => {

    e.preventDefault()

    valuesInstallmentData['amountPaid'] =  parseFloat(valuesInstallmentData['amountPaid']).toFixed(3).slice(0, -1)

    let finalInstallmentData = values['paymentInfo']['installmentsData'].map( data => data['installment'] === installment ? valuesInstallmentData : data )
    values['paymentInfo']['installmentsData'] = finalInstallmentData
  
    console.log( '------ Nova alteracao -------' )
    console.log( values )
    
    handleOpenCloseDialog()

  }
  
  return (
    <>
      <button className="userListEdit modal__button" variant="outlined" onClick={handleOpenCloseDialog}>
        Dar baixa
      </button>


      <Dialog 
        open={isOpenModal}
        onClose={handleOpenCloseDialog}
        PaperProps={{
          style: {
            maxWidth: "720px"
          },
        }}
        > 

        <form onSubmit={handleSubmit}>
    
          <DialogTitle className="modal__title">Informe os seguintes dados do recebimento</DialogTitle>
          
          <div className='modal__container'>
            
            <div className="form__input--halfWidth">            
              <CustomTextField
                disabled
                id="name-disabled"
                label="Empresa/Cliente"
                variant="outlined" 
                defaultValue={values.name}
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                disabled
                id="dueDate-disabled"
                label="Vencimento"
                variant="outlined" 
                defaultValue={`${new Date( valuesInstallmentData.dueDate ).toLocaleDateString('pt-br')}`}
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                disabled
                id="amountPay-disabled"
                label="Valor Total a Receber"
                variant="outlined" 
                defaultValue={values.amountPay}
                InputProps={
                  {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                }
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                disabled
                id="installmentAmountPay-disabled"
                label="Valor da parcela"
                variant="outlined" 
                defaultValue={valuesInstallmentData.installmentAmountPay}
                InputProps={
                  {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                }
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                disabled
                id="installment-disabled"
                label="Número da parcela"
                variant="outlined" 
                defaultValue={`${valuesInstallmentData.installment} / ${values.paymentInfo.installments}`}
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomFormControl>
                <InputLabel id="service-label">Serviço</InputLabel>

                <Select
                  labelId="service-label"
                  disabled
                  id="service"
                  value={values.service}
                  label="Serviço"
                >

                  <MenuItem value='proposta'>Proposta</MenuItem>
                  <MenuItem value='ordemServico'>Ordem de Serviço</MenuItem>
                  <MenuItem value='vendaProduto'>Venda de Produto</MenuItem>
                    
                </Select>
              </CustomFormControl>
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField      
                id="amountPaid"
                label="Valor Recebido"
                type="number"
                required
                variant="outlined"
                value={valuesInstallmentData.amountPaid}
                onChange={handleInstallmentInformation('amountPaid')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  inputProps: { min: 0, step:".01" }
                }}                
                />
            </div>

            <div className="form__input--halfWidth">
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
                <DatePicker
                  label="Data de Recebimento"
                  id="paymentDate"
                  value={ valuesInstallmentData.paymentDate }
                  inputFormat="dd/MM/yyyy"      
                  onChange={ (newValue) => {
                    setValuesInstallmentData( { ...valuesInstallmentData, paymentDate: `${new Date( newValue )}` } );
                  }}
                  renderInput={(params) => <CustomTextField {...params}/>}
                />
              </LocalizationProvider>
            </div>

            <div className="form__input--halfWidth">
              <CustomFormControl>
                <InputLabel id="paymentType-label">Forma de Recebimento</InputLabel>

                <Select
                  labelId="paymentType-label"
                  id="paymentType"
                  value={valuesInstallmentData.paymentType}
                  label="Forma de pagamento"
                  onChange={handleInstallmentInformation('paymentType')}
                >

                  <MenuItem value='boleto'>Boleto</MenuItem>
                  <MenuItem value='pix'>PIX</MenuItem>
                  <MenuItem value='transferência'>Transferência</MenuItem>
                  <MenuItem value='deposito'>Depósito</MenuItem>
                  <MenuItem value='cheque'>Cheque</MenuItem>
                  <MenuItem value='dinheiro'>Dinheiro</MenuItem>
                </Select>

              </CustomFormControl>
            </div>

            <div className="form__input--halfWidth">
              <label htmlFor="receiptFile">
                <input
                  style={{ display: "none" }}
                  id="receiptFile"
                  name="receiptFile"
                  type="file"
                  onChange={handleOnChangeInformation('receiptFile')}
                />
                
                <Fab
                  className='modal__upload--button'
                  component="span"
                  aria-label="add"
                  variant="extended">

                  <AddIcon/> Comprovante
                </Fab>
              </label>

            </div>

            <div className="form__input--fullWidth">
              <CustomTextField
                id="additionalInformation"
                label="Informações adicionais"
                multiline
                value={values.additionalInformation}
                rows={4}
                onChange={handleOnChangeInformation('additionalInformation')}
              />
            </div>

          </div>


          <DialogActions>
            <Button onClick={handleOpenCloseDialog}>Cancelar</Button>
            <Button type="submit">Ok</Button>
          </DialogActions>

        </form>

      </Dialog>
    </>
  );
  }