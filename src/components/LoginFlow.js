import React, { useState ,useEffect  } from 'react'
import { ThemeProvider, createTheme, Box, Container } from '@mui/material'
import LoginForm from './LoginForm.js'
import LoginInitialSteps from './LoginInitialSteps.js'
import LoginUserTypeSelection from './LoginUserTypeSelection.js'
import LoginInfoForm from './LoginInfoForm.js'
import LoginSuccessScreen from './LoginSuccessScreen.js'
import axios from 'axios'
import { randomReviews } from '../data/reviewsData.js';

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
  //onLogin.userType

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
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Formulario usuario:", loginData)
        const response = await axios.post('http://localhost:5001/auth/login', loginData);
        const { userType, nombre } = response.data;
        onLogin({ userType, nombre });
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

  const handleSubmitForm = async () => {
    console.log('Form submitted:', formData)

    try
    {
        const mapData = {
          nombre: formData.nombre,
          fecha_nacimiento: new Date(formData.fechaNacimiento),
          direccion: {
              localidad: formData.localidad,
              calle: formData.direccion, 
              numero: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
          },
          descripcion: formData.actividades,
          tareas: formData.tareasAsistencia,
          userType: formData.userType,
          email: formData.email,
          contrasena: formData.contrasena,
          reviews: randomReviews, 
          rating: ((Math.random() * (5 - 3.5) + 3.5).toFixed(2)).toString()
      };

      const response = await axios.post('http://localhost:5001/register/Create/User', mapData);
      console.log(response.data);
    }
    catch(error){
      console.error('Error al registrar usuario:', error.response?.data?.message || error.message);
    }
    setStep(5)
  }

  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        window.location.reload();
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