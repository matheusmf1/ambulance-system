import React, {Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";


import '../modal.css';

class BillModal extends Component {

  constructor() {
    super();
    this.state = { 
      open: false,
      valorPago: '',
      date: null,
      formaPagamento: ''
    };
  }

  render() {

    const handleClickOpen = () => {
      this.setState({open: true})
    };
  
    const handleClose = () => {
      this.setState({open: false})
    };
  
    const handleInformation = () => {
      
      handleClose()
    }
  
    const handleOnChangeInformation = (e) => {
      console.log(e)
      let value = e.target.value;
      this.setState( { [e.target.id]: value }, () => console.log( value ) )
    }
  
    return (
      <>
        <button className="userListEdit" variant="outlined" onClick={handleClickOpen}>
          Dar baixa
        </button>

  
        <Dialog open={this.state.open} onClose={handleClose}>
      
          <DialogTitle className="modal__title">Informe os seguintes dados de pagemento</DialogTitle>

          <div className='modal__container'>
            
            <div className="form__input--halfWidth">            
              <TextField
                disabled
                id="outlined-disabled"
                label="Empresa"
                variant="outlined" 
                defaultValue="xx"
              />
            </div>

            <div className="form__input--halfWidth">
              <TextField
                disabled
                id="outlined-disabled"
                label="Vencimento"
                variant="outlined" 
                defaultValue="xx"
              />
            </div>

            <div className="form__input--halfWidth">
              <TextField
                disabled
                id="outlined-disabled"
                label="Valor"
                variant="outlined" 
                defaultValue="xx"
              />
            </div>

            <div className="form__input--halfWidth">
              <TextField
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
                  fullscreen
                  value={this.state.date}
                  onChange={(newValue) => {
                    this.setState( { date: newValue } )
                  }}
                  renderInput={(params) => <TextField {...params}/>}
                />
              </LocalizationProvider>
            </div>

            <div className="form__input--halfWidth">
              <TextField      
                id="valorPago"
                label="Valor pago"
                type="text"
                variant="outlined" 
                onChange={handleOnChangeInformation}
                InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>,}}
                />
            </div>

            <div className="form__input--halfWidth">
              <FormControl>
                  <InputLabel id="formaPagamento-label">Forma de Pagamento</InputLabel>

                  <Select
                    labelId="formaPagamento-label"
                    id="formaPagamento"
                    value={this.state.formaPagamento}
                    label="Forma de Pagamento"
                    // autoWidth
                    onChange={handleOnChangeInformation}
                  >

                    <MenuItem value='boleto'>Boleto</MenuItem>
                    <MenuItem value='pix'>PIX</MenuItem>
                    <MenuItem value='transferência'>Transferência</MenuItem>
                    <MenuItem value='deposito'>Depósito</MenuItem>
                    <MenuItem value='cheque'>Cheque</MenuItem>
                    <MenuItem value='dinheiro'>Dinheiro</MenuItem>
                  </Select>

                </FormControl>
            </div>

            <div className="form__input--halfWidth">
              {/* <TextField 
                id="input_file"
                label="Arquivo"
                type="text"
                variant="outlined" 
                onChange={handleOnChangeInformation}/> */}

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
              <TextField
                id="observacao-input"
                label="Observações"
                multiline
                rows={4}
                defaultValue=""
              />
            </div>

          </div>
  
  
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleInformation}>Ok</Button>
          </DialogActions>
  
        </Dialog>
      </>
    );
  }
}

export default BillModal