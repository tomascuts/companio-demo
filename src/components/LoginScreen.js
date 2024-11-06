import { useState } from 'react'
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel,
  Checkbox,
  Typography,
  IconButton,
  Box,
  Container,
  ThemeProvider,
  createTheme
} from '@mui/material'
import { 
  Handshake as HandshakeIcon, 
  Clear as ClearIcon, 
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material'

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

export default function LoginScreen() {
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

  const renderLoginForm = () => (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Box position="relative" width={64} height={64}>
          <FavoriteIcon sx={{ fontSize: 64, color: 'primary.main' }} />
          <HandshakeIcon sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: 32
          }} />
        </Box>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          COMPANIO
        </Typography>
      </Box>

      <Box mt={4}>
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
                <IconButton onClick={() => setLoginData({ ...loginData, email: '' })}>
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
                <IconButton onClick={() => setLoginData({ ...loginData, contrasena: '' })}>
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
            No tienes cuenta?{" "}
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
    </Container>
  )

  const renderInitialSteps = () => (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Box bgcolor="pink.200" borderRadius="50%" p={2}>
            <HandshakeIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
        </Box>
        <Typography variant="h6" align="center" color="primary.main" gutterBottom>
          COMPANIO
        </Typography>
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
            
            <TextField
              fullWidth
              margin="normal"
              name="nombre"
              label="Nombre"
              variant="outlined"
              value={formData.nombre}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: formData.nombre && (
                  <IconButton onClick={() => setFormData({ ...formData, nombre: '' })}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
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
              InputProps={{
                endAdornment: formData.email && (
                  <IconButton onClick={() => setFormData({ ...formData, email: '' })}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              name="telefono"
              type="tel"
              label="Teléfono"
              variant="outlined"
              value={formData.telefono}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: formData.telefono && (
                  <IconButton onClick={() => setFormData({ ...formData, telefono: '' })}>
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
              value={formData.contrasena}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: formData.contrasena && (
                  <IconButton onClick={() => setFormData({ ...formData, contrasena: '' })}>
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />

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

  const renderUserTypeSelection = () => (
    <Box textAlign="center" p={2}>
      <Typography variant="h4" gutterBottom>¡Hola {userName || 'Usuario'}!</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        ¿Prefieres recibir ayuda o ser quien la ofrece?
      </Typography>
      
      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        <Box 
          onClick={() => handleUserTypeSelect('asistido')}
          sx={{ cursor: 'pointer' }}
        >
          <Box 
            width={128} 
            height={128} 
            bgcolor="primary.light" 
            borderRadius="50%" 
            mx="auto" 
            mb={1}
            overflow="hidden"
          >
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Persona mayor"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography color="primary">Prefiero ser asistido</Typography>
        </Box>

        <Box 
          onClick={() => handleUserTypeSelect('asistir')}
          sx={{ cursor: 'pointer' }}
        >
          <Box 
            width={128} 
            height={128} 
            bgcolor="secondary.light" 
            borderRadius="50%" 
            mx="auto" 
            mb={1}
            overflow="hidden"
          >
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Persona joven"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Typography color="secondary">Prefiero asistir</Typography>
        </Box>
      </Box>
    </Box>
  )

  const renderInfoForm = () => (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => setStep(3)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" ml={2}>¡Queremos conocerte mejor!</Typography>
      </Box>

      <Box>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>INFORMACIÓN:</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            fullWidth
            name="nombreCompleto"
            label="Nombre completo"
            variant="outlined"
            value={formData.nombreCompleto}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            type="date"
            variant="outlined"
            value={formData.fechaNacimiento}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            name="direccion"
            label="Dirección"
            variant="outlined"
            value={formData.direccion}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            name="localidad"
            label="Localidad"
            variant="outlined"
            value={formData.localidad}
            onChange={handleInputChange}
          />
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle2" color="text.secondary" mb={2}>DESCRIPCIÓN:</Typography>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            fullWidth
            name="actividades"
            label="Contanos sobre tus actividades diarias"
            multiline
            rows={4}
            variant="outlined"
            value={formData.actividades}
            onChange={handleInputChange}
          />

          {formData.userType === 'asistido' ? (
            <>
              <FormControl component="fieldset">
                <FormLabel component="legend">¿Cómo evaluarías el nivel de su actividad física?</FormLabel>
                <RadioGroup
                  name="nivelActividad"
                  value={formData.nivelActividad}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="alta" control={<Radio />} label="Alta" />
                  <FormControlLabel value="media" control={<Radio />} label="Media" />
                  <FormControlLabel value="baja" control={<Radio />} label="Baja" />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">¿Tienes alguna enfermedad/discapacidad/otro?</FormLabel>
                <RadioGroup
                  name="tieneEnfermedad"
                  value={formData.tieneEnfermedad}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Si" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>

              {formData.tieneEnfermedad === 'si' && (
                <TextField
                  fullWidth
                  name="enfermedad"
                  label="En caso de afirmativo, ¿Cuál?"
                  variant="outlined"
                  value={formData.enfermedad}
                  onChange={handleInputChange}
                />
              )}
            </>
          ) : (
            <FormControl component="fieldset">
              <FormLabel component="legend">¿En qué tareas te gustaría brindar asistencia?</FormLabel>
              <Box>
                {[
                  { id: 'acompanamiento', label: 'Acompañamiento' },
                  { id: 'ayuda_compras', label: 'Ayuda con las compras' },
                  { id: 'tramites_online', label: 'Ayuda con trámites online' },
                  { id: 'tramites_presenciales', label: 'Ayuda con trámites presenciales' },
                  { id: 'pasear_perro', label: 'Pasear al perro' },
                  { id: 'ayuda_tecnologia', label: 'Ayuda con la tecnología' },
                ].map((task) => (
                  <FormControlLabel
                    key={task.id}
                    control={
                      <Checkbox
                        checked={formData.tareasAsistencia.includes(task.id)}
                        onChange={(e) => {
                          const updatedTasks = e.target.checked
                            ? [...formData.tareasAsistencia, task.id]
                            : formData.tareasAsistencia.filter((id) => id !== task.id);
                          setFormData({ ...formData, tareasAsistencia: updatedTasks });
                        }}
                      />
                    }
                    label={task.label}
                  />
                ))}
              </Box>
            </FormControl>
          )}
        </Box>
      </Box>

      <Button 
        fullWidth
        variant="contained"
        color="secondary"
        onClick={handleSubmitForm}
        sx={{ mt: 4 }}
      >
        Continuar
      </Button>
    </Box>
  )

  const renderSuccessScreen = () => (
    <Box 
      minHeight="100vh" 
      bgcolor="cyan.50" 
      position="relative" 
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={2}
    >
      <Box 
        position="absolute" 
        top={0} 
        right={0} 
        width="100%" 
        height="160px" 
        bgcolor="cyan.100" 
        borderBottomLeftRadius="100%"
      />
      <Box 
        position="absolute" 
        bottom={0} 
        left={0} 
        width="100%" 
        height="160px" 
        bgcolor="pink.200" 
        borderTopRightRadius="100%"
      />
      <Box position="relative" zIndex={1}>
        <Typography variant="h4" fontWeight="bold" mb={2}>¡Está todo listo!</Typography>
        <Typography variant="h6" mb={3}>Bienvenido a</Typography>
        <Box mb={3}>
          <Box bgcolor="pink.200" borderRadius="50%" p={2} display="inline-block">
            <HandshakeIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" color="primary.main" fontWeight="bold" mt={1}>
            COMPANIO
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight="bold">¡Empecemos!</Typography>
      </Box>
    </Box>
  )

  return (
    <ThemeProvider theme={theme}>
      <Box minHeight="100vh" bgcolor="cyan.50">
        <Container maxWidth="sm">
          {isLogin ? (
            renderLoginForm()
          ) : step < 3 ? (
            renderInitialSteps()
          ) : step === 3 ? (
            renderUserTypeSelection()
          ) : step === 4 ? (
            renderInfoForm()
          ) : (
            renderSuccessScreen()
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}