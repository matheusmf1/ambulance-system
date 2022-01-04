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

export default function BillPayModal( props ) {

  const { data } = props
  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const [values, setValues] = useState({
    id: `${data.id}`,
    billType: `${data.billType}`,
    documentNumber: `${data.documentNumber}`,
    installments: `${data.installments}`,
    service: `${data.service}`,
    serviceNumber: `${data.serviceNumber}`,
    billFile: `${data.billFile}`,

    name: `${data.name}`,
    dueDate: `${data.dueDate}`,
    amountPay: `${data.amountPay}`,
    expenseType: `${data.expenseType}`,
    receiptFile: `${data.receiptFile}`,
    paymentDate: `${new Date()}`,
    amountPaid: `${data.amountPaid}`,
    paymentType: `${data.paymentType}`,
    additionalInformation: `${data.additionalInformation}`,
  });

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };
  
  
  const handleInformation = () => {

    console.log(values)
    
    // handleOpenCloseDialog()
  }
  
  const handleOnChangeInformation = (id) => (e) => {
    setValues( { ...values, [id]: e.target.value } );
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
    
        <DialogTitle className="modal__title">Informe os seguintes dados de pagamento</DialogTitle>

        <div className='modal__container'>
          
          <div className="form__input--halfWidth">            
            <CustomTextField
              disabled
              id="name-disabled"
              label="Empresa"
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
              defaultValue={`${new Date( values.dueDate ).toLocaleDateString('pt-br')}`}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              disabled
              id="amountPay-disabled"
              label="Valor da conta"
              variant="outlined" 
              defaultValue={values.amountPay}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Tipo de despesa</InputLabel>

              <Select
                disabled
                labelId="formaPagamento-label"
                id="expenseType"
                value={values.expenseType}
                label="Tipo de despesa"
              >
                
                <MenuItem value="fixa">Fixa</MenuItem>
                <MenuItem value="folhaPagamento">Folha de Pagamento</MenuItem>
                <MenuItem value="impostos">Impostos</MenuItem>
                <MenuItem value="bancaria">Bancária</MenuItem>
                <MenuItem value="produto">Produto</MenuItem>
                <MenuItem value="serviço">Serviço</MenuItem>   
                <MenuItem value="alimentacao">Alimentação</MenuItem>   

              </Select>

            </CustomFormControl>
          </div>

          <div className="form__input--halfWidth">

            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
              <DatePicker
                label="Data de Pagamento"
                id="date"
                value={ values.paymentDate }
                inputFormat="dd/MM/yyyy"      
                onChange={ (newValue) => {
                  setValues( { ...values, paymentDate: `${new Date( newValue )}` } );
                }}
                renderInput={(params) => <CustomTextField {...params}/>}
              />
            </LocalizationProvider>
          </div>

          <div className="form__input--halfWidth">
            
              <CustomTextField      
                id="amountPaid"
                label="Valor pago"
                type="text"
                variant="outlined"
                value={values.amountPaid}
                onChange={handleOnChangeInformation('amountPaid')}
                InputProps={
                  {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                }
                />
            
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
                <InputLabel id="formaPagamento-label">Forma de pagamento</InputLabel>

                <Select
                  labelId="formaPagamento-label"
                  id="paymentType"
                  value={values.paymentType}
                  label="Forma de pagamento"
                  onChange={handleOnChangeInformation('paymentType')}
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
          <Button onClick={handleInformation}>Ok</Button>
        </DialogActions>

      </Dialog>
    </>
  );
  }