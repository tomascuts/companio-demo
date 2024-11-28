import React, { useState ,useEffect  } from 'react'
import { ThemeProvider, createTheme, Box, Container } from '@mui/material'
import LoginForm from './LoginForm.js'
import LoginInitialSteps from './LoginInitialSteps.js'
import LoginUserTypeSelection from './LoginUserTypeSelection.js'
import LoginInfoForm from './LoginInfoForm.js'
import LoginSuccessScreen from './LoginSuccessScreen.js'
import axios from 'axios'

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
//holaaa
const LoginFlow = ({ onLogin }) => {
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
  const [userType, setUserType] = useState('asistido');

  const handleInputChange = (e) => { // Actualiza el estado de formData a medida que el usuario escribe en los campos del formulario. Si el campo es nombre, también actualiza el estado userName.
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'nombre') {
      setUserName(e.target.value)
    }
  }

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    console.log(`Actualizando ${name}:`, value); // Debug
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData); // Debug
    try {
        const response = await axios.post('http://localhost:5000/auth/login', loginData);

        // Si la autenticación es exitosa
        const { userType, nombre } = response.data;
        onLogin({ userType });
        setStep(5);

        console.log(`Bienvenido, ${nombre}!`);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Usuario no encontrado');
        } else if (error.response && error.response.status === 401) {
            alert('Credenciales incorrectas');
        } else {
            alert('Error en el servidor, intente más tarde');
        }
    }
};

const handleUserType = (type) => {
  setUserType(type);
  onLogin({ userType: type });
};

  const handleUserTypeSelect = (type) => {
    setFormData({ ...formData, userType: type })
    setStep(4)
  }

  const handleSubmitForm = () => {
    console.log('Form submitted:', formData)
    setStep(5)
  }

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        onLogin('asistido'); 
      }, 4000);

      return () => clearTimeout(timer); 
    }
  }, [step, onLogin]);

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
              onUserType={handleUserType}
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
};

export default LoginFlow;