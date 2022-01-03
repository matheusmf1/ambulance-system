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

export default function BillReceiveModalEdit( props ) {

  const { data } = props
  console.log('BillModalEdit')
  console.log(data)

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
    paymentDate: `${data.paymentDate}`,
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
    
        <DialogTitle className="modal__title">12 Editar dados de Conta a Pagar</DialogTitle>

        <div className='modal__container'>
          
          <div className="form__input--halfWidth">            
            <CustomTextField
              id="name"
              label="Empresa"
              variant="outlined" 
              defaultValue={values.name}
              onChange={handleOnChangeInformation('name')}
            />
          </div>

          <div className="form__input--halfWidth">
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBrLocate}>
              <DatePicker
                label="Data de vencimento"
                id="dueDate"
                value={ values.dueDate }
                inputFormat="dd/MM/yyyy"      
                onChange={ (newValue) => {
                  setValues( { ...values, dueDate: `${new Date( newValue )}` } );
                }}
                renderInput={(params) => <CustomTextField {...params}/>}
              />
            </LocalizationProvider>
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField  
              id="amountPay"
              label="Valor da conta"
              variant="outlined" 
              defaultValue={values.amountPay}
              onChange={handleOnChangeInformation('amountPay')}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Formas de pagamento</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="paymentType"
                value={values.paymentType}
                label="Formas de pagamento"
                onChange={handleOnChangeInformation('paymentType')}>

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
            <CustomTextField
              id="documentNumber"
              label="Número do documento"
              variant="outlined" 
              defaultValue={values.documentNumber}
              onChange={handleOnChangeInformation('documentNumber')}
            />
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

          {/* <div className="form__input--halfWidth">
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

          </div> */}

          <div className="form__input--halfWidth">
            <CustomTextField
              id="installments"
              label="Parcelas"
              variant="outlined" 
              defaultValue={values.installments}
              onChange={handleOnChangeInformation('installments')}
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
              <InputLabel id="formaPagamento-label">Tipo de despesa</InputLabel>

              <Select
                labelId="formaPagamento-label"
                id="expenseType"
                value={values.expenseType}
                label="Tipo de despesa"
                onChange={handleOnChangeInformation('expenseType')}
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