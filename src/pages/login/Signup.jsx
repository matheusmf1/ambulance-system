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
import CopyRight from '../../components/CopyRight';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export default function SignUp() {
  const { signup } = useAuth();
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

    try {
      setError("");
      setLoading(true);
      await signup( email, password );
      history.push("/");
    } catch( error ) {
      console.error( error )
      setError("Erro ao criar o usuário, por favor tente novamente");
    }

    setLoading(false);
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
          Cadastre-se
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
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
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
                required
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
            Cadastre-se
          </Button>

          <Grid item>
            <Link to="/login" className="form__text--link">
              Já possui uma conta? Faça o Login
            </Link>
          </Grid>

        </Box>
      </Box>
        
      <CopyRight sx={{ mt: 4 }}/>

    </Container>   
  );
}