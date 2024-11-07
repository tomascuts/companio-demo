import React from 'react'
import { Box, Typography, TextField, Button, Card, CardContent, IconButton } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import Logo from './Logo'

export default function LoginInitialSteps({ step, setStep, setIsLogin, formData, handleInputChange }) {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Logo />
        {step === 1 ? (
          <Box textAlign="center">
            <Typography variant="body1" color="text.secondary" sx={{ px: 2, mb: 3 }}>
              Conectá con la ayuda que necesitas, cuando mas lo necesitas
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button 
                variant="contained"
                color="primary"
                onClick={() => setStep(2)}
              >
                Creá tu cuenta
              </Button>
              <Button 
                variant="outlined"
                color="secondary"
                onClick={() => setIsLogin(true)}
              >
                Inicia sesión
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
            <Typography variant="h5" align="center" gutterBottom>
              Creá tu cuenta
            </Typography>
            
            {['nombre', 'email', 'telefono', 'contrasena'].map((field) => (
              <TextField
                key={field}
                fullWidth
                margin="normal"
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                type={field === 'email' ? 'email' : field === 'contrasena' ? 'password' : 'text'}
                variant="outlined"
                value={formData[field]}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: formData[field] && (
                    <IconButton onClick={() => handleInputChange({ target: { name: field, value: '' } })}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              />
            ))}

            <Typography variant="caption" color="error">
              La contraseña debe contener mínimo 8 caracteres, una mayúscula y un número
            </Typography>

            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Registrarme
            </Button>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Ya tienes cuenta?{" "}
                <Button
                  color="primary"
                  onClick={() => setIsLogin(true)}
                >
                  Sign in
                </Button>
              </Typography>
            </Box>
          </form>
        )}
      </CardContent>
    </Card>
  )
}