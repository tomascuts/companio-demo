import React from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import Logo from './Logo'
import axios from 'axios'

export default function LoginForm({ loginData, handleLoginInputChange, handleLoginSubmit, setIsLogin, setStep }) {
  return (
    <Box mt={4}>
      <Logo />
      <Typography variant="h4" align="center" gutterBottom>
        Iniciá sesión
      </Typography>
      
      <form onSubmit={handleLoginSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          value={loginData.email}
          onChange={handleLoginInputChange}
          InputProps={{
            endAdornment: loginData.email && (
              <IconButton onClick={() => handleLoginInputChange({ target: { name: 'email', value: '' } })}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        <TextField
          fullWidth
          margin="normal"
          name="contrasena"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={loginData.contrasena}
          onChange={handleLoginInputChange}
          InputProps={{
            endAdornment: loginData.contrasena && (
              <IconButton onClick={() => handleLoginInputChange({ target: { name: 'contrasena', value: '' } })}>
                <ClearIcon />
              </IconButton>
            ),
          }}
        />

        <Button 
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Iniciar sesión
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          ¿No tenés cuenta?{" "}
          <Button
            color="primary"
            onClick={() => {
              setIsLogin(false)
              setStep(1)
            }}
          >
            Creá tu cuenta
          </Button>
        </Typography>
      </Box>
    </Box>
  )
}