import React, { useState } from 'react'
import { ThemeProvider, createTheme, Box, Container } from '@mui/material'
import LoginForm from './LoginForm.js'
import LoginInitialSteps from './LoginInitialSteps.js'
import LoginUserTypeSelection from './LoginUserTypeSelection.js'
import LoginInfoForm from './LoginInfoForm.js'
import LoginSuccessScreen from './LoginSuccessScreen.js'

const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63', // pink
    },
    secondary: {
      main: '#009688', // teal
    },
  },
});

export default function LoginFlow() {
  const [step, setStep] = useState(1)
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    userType: '',
    nombreCompleto: '',
    fechaNacimiento: '',
    direccion: '',
    localidad: '',
    actividades: '',
    nivelActividad: '',
    tieneEnfermedad: '',
    enfermedad: '',
    tareasAsistencia: []
  })
  const [loginData, setLoginData] = useState({
    email: '',
    contrasena: ''
  })
  const [userName, setUserName] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'nombre') {
      setUserName(e.target.value)
    }
  }

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log('Login submitted:', loginData)
    setStep(3)
  }

  const handleUserTypeSelect = (type) => {
    setFormData({ ...formData, userType: type })
    setStep(4)
  }

  const handleSubmitForm = () => {
    console.log('Form submitted:', formData)
    setStep(5)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bgcolor="cyan.50">
        <Container maxWidth="sm">
          {isLogin ? (
            <LoginForm 
              loginData={loginData}
              handleLoginInputChange={handleLoginInputChange}
              handleLoginSubmit={handleLoginSubmit}
              setIsLogin={setIsLogin}
              setStep={setStep}
            />
          ) : step < 3 ? (
            <LoginInitialSteps 
              step={step}
              setStep={setStep}
              setIsLogin={setIsLogin}
              formData={formData}
              handleInputChange={handleInputChange}
            />
          ) : step === 3 ? (
            <LoginUserTypeSelection 
              userName={userName}
              handleUserTypeSelect={handleUserTypeSelect}
            />
          ) : step === 4 ? (
            <LoginInfoForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmitForm={handleSubmitForm}
              setStep={setStep}
            />
          ) : (
            <LoginSuccessScreen />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}