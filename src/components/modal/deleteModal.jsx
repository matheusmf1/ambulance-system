import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import { DeleteOutline } from "@material-ui/icons";

export default function DeleteModal( { id } ) {

  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };

  const handleInformation = () => {

    console.log('Deleting...')
    console.log( id )


    handleOpenCloseDialog()
  }
  
  
  return (
    <>

      <DeleteOutline
        className="userListDelete"
        onClick={handleOpenCloseDialog}
      />

      <Dialog 
        open={isOpenModal}
        onClose={handleOpenCloseDialog}
        PaperProps={{
          style: {
            maxWidth: "400px"
          },
        }}
        >      
    
        <DialogTitle className="modal__title">Aviso</DialogTitle>

        <DialogContent className="modal__description">
          <Typography gutterBottom>
            Excluindo esse item, também apagará as demais informações dessa conta.
          </Typography>
        </DialogContent>


        <DialogActions>
          <Button onClick={handleOpenCloseDialog}>Cancelar</Button>
          <Button onClick={handleInformation}>Ok</Button>
        </DialogActions>

      </Dialog>
    </>
  );
  }