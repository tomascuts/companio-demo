import React, { useState } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import { Clear as ClearIcon } from '@mui/icons-material'
import Logo from './Logo'

export default function RegisterForm({ setIsLogin, setStep }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contrasena: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      if (response.ok) {
        alert('¡Registro exitoso!')
        setIsLogin(true)
        setStep(1)
      } else {
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error al registrar:', error)
      alert('Hubo un problema al registrar. Inténtalo de nuevo.')
    }
  }

  return (
    <Box mt={4}>
      <Logo />
      <Typography variant="h4" align="center" gutterBottom>
        Registrate
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="nombre"
          type="text"
          label="Nombre"
          variant="outlined"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        
        <TextField
          fullWidth
          margin="normal"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
        />

        <TextField
          fullWidth
          margin="normal"
          name="contrasena"
          type="password"
          label="Contraseña"
          variant="outlined"
          value={formData.contrasena}
          onChange={handleInputChange}
        />

        <Button 
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Registrarse
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          ¿Ya tienes cuenta?{" "}
          <Button
            color="primary"
            onClick={() => {
              setIsLogin(true)
              setStep(1)
            }}
          >
            Inicia sesión
          </Button>
        </Typography>
      </Box>
    </Box>
  )
}
