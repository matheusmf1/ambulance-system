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
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";


export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState( false );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email');
  
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword( email );
      setMessage("Verifique seu email para mais instruções");

    } catch( error ) {
      console.error( error )
      setError("Erro ao redefinir a senha");
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
          Redefinir Senha
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}
        {message && <Alert severity="success">{message}</Alert>}
        
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          
          <Grid container spacing={2}>

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

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Redefinir senha
          </Button>

          <Grid item>
            <Link to="/login" className="form__text--link">
              Login
            </Link>

            <Link to="/signup" className="form__text--link">
              Ainda não tem conta? Cadastre-se
            </Link>
          </Grid>

        </Box>
      </Box>
        
      <CopyRight sx={{ mt: 4 }}/>

    </Container>   
  );
}