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

import { Bill } from "../../../data/Bill";
import { storage, bucketName } from "../../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

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
    id: data.id,
    name: `${data.name}`,
    billType: `${data.billType}`,
    documentNumber: `${data.documentNumber}`,
    billFile: `${data.billFile}`,
    additionalInformation: `${data.additionalInformation}`,
    amountPay: `${data.amountPay}`,

    service: `${data.service}`,
    serviceNumber: `${data.serviceNumber}`,

    paymentInfo: {
      installments: `${data['paymentInfo'].installments}`,
      installmentsData: data['paymentInfo'].installmentsData,
    }
  });

  const [ billFileData, setBillFileData ] = useState( null );

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };

  const handleInstallmentInformation = ( id ) => ( e ) => {
    setValuesInstallmentData( { ...valuesInstallmentData, [id]: e.target.value } );
  }

  const handleOnChangeInformation = (id) => (e) => {
    
    if ( id === 'billFile' ) {      
     
      if ( e.target.files[0] ) {
        setValues( { ...values, [id]: e.target.files[0]['name'] } );
      
        let data = {
          file: e.target.files[0],
          fileID: "billFile"
        }
        setBillFileData( data );
      } 
      else {
        setValues( { ...values, [id]: '' } );
        setBillFileData( null );
      }

    }
    else {
      setValues( { ...values, [id]: e.target.value } );
    }
  }

  const checkIfFileHasChanged = () => {

    if ( billFileData ) {
      return billFileData;
    }
    else {
      return false;
    }
  }

  const handleSubmit = async ( e ) => {

    e.preventDefault()

    let finalInstallmentData = values['paymentInfo']['installmentsData'].map( data => data['installment'] === installment ? valuesInstallmentData : data )
    values['paymentInfo']['installmentsData'] = finalInstallmentData
    
    const bill = new Bill( { data: values, id: values['id'], billType: "receive", file: checkIfFileHasChanged() } )
    let result = await bill.updateBillOnFirebase();

    if ( result ) {
      alert( "Conta atualizada com sucesso" )
      window.location.reload()
    }
    else {
      alert( "Algo deu errado ao atualizar as informações. Por favor verifique todas as informações e tente novamente." )
    }
    
    handleOpenCloseDialog()
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
                value={values.serviceNumber}
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
                  <MenuItem value='transferencia'>Transferência</MenuItem>
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

                  <MenuItem value='transformationProposal'>Proposta</MenuItem>
                  <MenuItem value='serviceOrder'>Ordem de Serviço</MenuItem>
                  <MenuItem value='productsSale'>Venda de Produto</MenuItem>
                    
                </Select>
              </CustomFormControl>
            </div>

            <div className="form__input--halfWidth">
              <CustomTextField
                id="billFile"
                label="Arquivo da conta"
                variant="outlined" 
                disabled
                value={ values.billFile }
                onClick={ () => {

                  if ( values.billFile !== '' ) {
                    let gsReference = getDownloadURL( ref( storage, `gs://${bucketName}/bills_receive/${values.id}/billFile/${values.billFile}`) )
                    .then( data => window.open( data, '_blank', 'noopener,noreferrer') );
                    
                  }
                  
                }}
              />
            </div>

            <div className="form__input--halfWidth">
              <label htmlFor="upload-file">
                <input
                  style={{ display: "none" }}
                  id="upload-file"
                  name="upload-file"
                  type="file"
                  onChange={handleOnChangeInformation('billFile')}
                />
                
                <Fab
                  className='modal__upload--button'
                  component="span"
                  aria-label="add"
                  variant="extended"
                >

                  <AddIcon /> Substituir Arquivo
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