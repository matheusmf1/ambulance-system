import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export default function UpdateProfile() {

  const { currentUser, updatePasswordProvider, updateEmailProvider } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState( false );
  const history = useHistory();


  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const nome = data.get('name')
    const email = data.get('email')
    const password = data.get('password')
    const passwordConfirm = data.get('passwordConfirm')

    if ( password !== passwordConfirm ) {
      return setError("Senhas não conferem");
    }

    const promises = [];
    setLoading( true );
    setError("");

    if ( email !== currentUser.email ) {
      promises.push( updateEmailProvider( email ) )
    }
    if ( password ) {
      promises.push( updatePasswordProvider( password ) )
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Erro ao atualizar a conta")
      })
      .finally(() => {
        setLoading(false)
      })
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Atualizar Perfil
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                label="Nome"
                name="name"
                required
                fullWidth
                id="name"
                autoFocus
                defaultValue={ currentUser.displayName }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
                defaultValue={ currentUser.email }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="passwordConfirm"
                label="Confirme sua senha"
                type="password"
                id="passwordConfirm"
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Atualizar
          </Button>

        </Box>
      </Box>
    
    </Container>   
  );
}