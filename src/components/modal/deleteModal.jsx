import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

import { DeleteOutline } from "@material-ui/icons";

export default function DeleteModal( { id, deleteFunction, collection, setCollection } ) {

  const [ isOpenModal, setIsOpenModal  ] = useState( false );

  const handleOpenCloseDialog = ( e ) => {
    setIsOpenModal( !isOpenModal )
  };

  const handleInformation = async () => {

    const result = await deleteFunction( id )
    
    if ( result ) {
      setCollection( collection.filter( item => item.id !== id ) )
    }
    else {
      alert( "Algo deu errado ao apagar as informações, por favor tente novamente." )
      window.location.reload();
    }

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