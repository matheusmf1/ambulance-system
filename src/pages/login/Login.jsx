import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import './login.css';


export default function Login() {

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState( false );
  const history = useHistory();

  const Copyright = (props) => {
    return (
      <Typography className="form__text--link" color="text.secondary" align="center" {...props}>
        {'Copyright © '}<Link className='form__text--link' to="https://matheusmf.com/" target="_blank" rel="noreferrer">
          Matheus Mandotti
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    try {
      setError("");
      setLoading( true );
      await login( email, password );
      history.push("/"); 
    } catch {
      setError("Erro ao fazer login, email ou senha incorretos")
    }

    setLoading( false );

  };

  return (
    
      <Grid container component="main" sx={{ height: '100vh', padding: '0px' }}>
        
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url('../../assets/images/logo-rescue.png')",
            backgroundRepeat: 'no-repeat',
            backgroundSize: '75% auto',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Login
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de Email"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />


              <Button 
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Entrar
              </Button>


              <Grid container>

                <Grid item xs>
                  <Link to="/forgot-password" className="form__text--link">
                    Esqueceu sua senha?
                  </Link>
                </Grid>

                <Grid item>
                  <Link to="/signup" className="form__text--link">
                    {"Ainda não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>

              </Grid>

              <Copyright sx={{ mt: 5 }} />
              
            </Box>
          </Box>
        </Grid>

      </Grid>
  );
}