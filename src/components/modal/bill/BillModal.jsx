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

import '../modal.css';

export default function BillModal() {

  const [values, setValues] = useState({
    open: false,
    valorPago: '',
    date: `${new Date()}`,
    formaPagamento: '',
    file: '',
    observacao: ''
  });

  const handleOpenCloseDialog = ( e ) => {
    setValues( {...values, open: !values.open} )
  };
  
  
  const handleInformation = () => {

    console.log(values)
    
    handleOpenCloseDialog()
  }
  
  const handleOnChangeInformation = (id) => (e) => {
    setValues( { ...values, [id]: e.target.value } );
  }
  
  return (
    <>
      <button className="userListEdit" variant="outlined" onClick={handleOpenCloseDialog}>
        Dar baixa
      </button>


      <Dialog 
        open={values.open}
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
              id="outlined-disabled"
              label="Empresa"
              variant="outlined" 
              defaultValue="xx"
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              disabled
              id="outlined-disabled"
              label="Vencimento"
              variant="outlined" 
              defaultValue="xx"
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              disabled
              id="outlined-disabled"
              label="Valor"
              variant="outlined" 
              defaultValue="xx"
            />
          </div>

          <div className="form__input--halfWidth">
            <CustomTextField
              disabled
              id="outlined-disabled"
              label="Categoria"
              variant="outlined" 
              defaultValue="xx"
            />
          </div>

          <div className="form__input--halfWidth">

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Data de Pagamento"
                id="date"
                value={ values.date }
                inputFormat="dd/MM/yyyy"      
                onChange={ (newValue) => {
                  // let date = `${newValue.getDate()}/${newValue.getMonth()}/${newValue.getFullYear()}`;
                  setValues( {...values, date: newValue} )
                }}
                renderInput={(params) => <CustomTextField {...params}/>}
              />
            </LocalizationProvider>
          </div>

          <div className="form__input--halfWidth">
            
              <CustomTextField      
                id="valorPago"
                label="Valor pago"
                type="text"
                variant="outlined"
                value={values.valorPago}
                onChange={handleOnChangeInformation('valorPago')}
                InputProps={
                  {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
                }
                />
            
          </div>

          <div className="form__input--halfWidth">
            <CustomFormControl>
                <InputLabel id="formaPagamento-label">Forma de Pagamento</InputLabel>

                <Select
                  labelId="formaPagamento-label"
                  id="formaPagamento"
                  value={values.formaPagamento}
                  label="Forma de Pagamento"
                  onChange={handleOnChangeInformation('formaPagamento')}
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
              id="observacao"
              label="Observações"
              multiline
              value={values.observacao}
              rows={4}
              onChange={handleOnChangeInformation('observacao')}
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