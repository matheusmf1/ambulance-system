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


export default function BillReceiveModalEdit( props ) {

  const { data,  installment } = props
  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const installmentData = data['paymentInfo']['installmentsData'].filter( data => data[ 'installment' ] === `${installment}` )[0]

  const [ valuesInstallmentData, setValuesInstallmentData ] = useState({
    installmentAmountPay: `${installmentData.installmentAmountPay}`,
    dueDate: `${installmentData.dueDate}`,
    receiptFile: `${installmentData.receiptFile}`,
    paymentDate: `${installmentData.paymentDate}`,
    amountPaid: `${installmentData.amountPaid}`,
    paymentType: `${installmentData.paymentType}`,
    installment: `${installmentData.installment}`,
    paymentStatus: `${installmentData.paymentStatus}`
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

  const handleSubmit = ( e ) => {

    e.preventDefault()

    let finalInstallmentData = values['paymentInfo']['installmentsData'].map( data => data['installment'] === installment ? valuesInstallmentData : data )
    values['paymentInfo']['installmentsData'] = finalInstallmentData
  

    console.log( '------ Nova alteracao -------' )
    console.log( values )
    
    handleOpenCloseDialog()
  }
  
  const handleOnChangeInformation = (id) => (e) => {
    setValues( { ...values, [id]: e.target.value } );
  }
  
  return (
    <>
      <button className="userListEdit" variant="outlined" onClick={handleOpenCloseDialog}>
        Editar
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
          
          <DialogTitle className="modal__title">Editar dados de Conta a Receber</DialogTitle>

          <div className='modal__container'>
            
            <div className="form__input--halfWidth">            
              <CustomTextField
                id="name"
                label="Empresa"
                required
                variant="outlined" 
                defaultValue={values.name}
                onChange={handleOnChangeInformation('name')}
              />
            </div>

            <div className="form__input--halfWidth">            
              <CustomTextField
                id="serviceNumber"
                disabled
                label="Nº Serviço"
                variant="outlined" 
                defaultValue={values.serviceNumber}
              />
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField  
                id="amountPay"
                label={ valuesInstallmentData.installment === "1" ? `Valor da parcela ${valuesInstallmentData.installment} / ${values.paymentInfo.installments} no total de R$ ${values.amountPay}` : "Valor Total a Receber"}
                disabled
                variant="outlined" 
                defaultValue={valuesInstallmentData.installmentAmountPay}
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
              <CustomFormControl>
                <InputLabel id="formaPagamento-label">Formas de Recebimento</InputLabel>

                <Select
                  labelId="formaPagamento-label"
                  id="paymentType"
                  value={valuesInstallmentData.paymentType}
                  label="Formas de pagamento"
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
              <CustomFormControl>
                <InputLabel id="service-label">Serviço</InputLabel>

                <Select
                  labelId="service-label"
                  id="service"
                  value={values.service}
                  label="Serviço"
                  onChange={handleOnChangeInformation('service')}
                >

                  <MenuItem value='proposta'>Proposta</MenuItem>
                  <MenuItem value='ordemServico'>Ordem de Serviço</MenuItem>
                  <MenuItem value='vendaProduto'>Venda de Produto</MenuItem>
                    
                </Select>
              </CustomFormControl>
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                id="billFile"
                label="Arquivo da conta"
                variant="outlined" 
                defaultValue={values.billFile}
                onChange={handleOnChangeInformation('billFile')}
              />
            </div>

            <div className="form__input--halfWidth">
              <label htmlFor="upload-file">
                <input
                  style={{ display: "none" }}
                  id="upload-file"
                  name="upload-file"
                  type="file"
                />
                
                <Fab
                  className='modal__upload--button'
                  component="span"
                  aria-label="add"
                  variant="extended"
                >

                  <AddIcon /> Comprovante
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
            {/* <Button onClick={handleInformation}>Ok</Button> */}
            <Button type="submit">Ok</Button>
          </DialogActions>
        
        </form>
      </Dialog>
    </>
  );
  }