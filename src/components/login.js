import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { HandshakeIcon, XCircle, ArrowLeft, Heart } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function login() {
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
    // Here you would typically handle the login logic
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
    <div className="min-h-screen bg-cyan-50 flex flex-col items-center pt-12 px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0">
              <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <HandshakeIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="mt-2 text-pink-700 font-semibold">COMPANIO</p>
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center">Iniciá sesión</h1>
          
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="relative">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginInputChange}
                className="bg-white pr-10"
              />
              {loginData.email && (
                <button
                  type="button"
                  onClick={() => setLoginData({ ...loginData, email: '' })}
                  className="absolute right-3 top-2.5"
                >
                  <XCircle className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>

            <div className="relative">
              <Input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={loginData.contrasena}
                onChange={handleLoginInputChange}
                className="bg-white pr-10"
              />
              {loginData.contrasena && (
                <button
                  type="button"
                  onClick={() => setLoginData({ ...loginData, contrasena: '' })}
                  className="absolute right-3 top-2.5"
                >
                  <XCircle className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>

            <Button 
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              Iniciar sesión
            </Button>
          </form>

          <p className="text-center text-sm">
            No tienes cuenta?{" "}
            <Button
              variant="link"
              className="text-pink-700 p-0"
              onClick={() => {
                setIsLogin(false)
                setStep(1)
              }}
            >
              Creá tu cuenta
            </Button>
          </p>
        </div>
      </div>
    </div>
  )

  const renderInitialSteps = () => (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-pink-200 p-4">
            <HandshakeIcon className="h-12 w-12 text-pink-700" />
          </div>
        </div>
        <h1 className="text-center font-semibold text-pink-950 mb-2">COMPANIO</h1>
        {step === 1 ? (
          <div className="text-center space-y-6">
            <p className="text-pink-900 text-lg px-8">
              Conectá con la ayuda que necesitas, cuando mas lo necesitas
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-pink-700 hover:bg-pink-800"
                onClick={() => setStep(2)}
              >
                Creá tu cuenta
              </Button>
              <Button 
                variant="secondary"
                className="w-full bg-teal-100 text-teal-700 hover:bg-teal-200"
                onClick={() => setIsLogin(true)}
              >
                Inicia sesión
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Creá tu cuenta</h2>
            
            <div className="relative">
              <Input
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="pr-10"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-pink-300" />
            </div>

            <div className="relative">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="pr-10"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-pink-300" />
            </div>

            <div className="relative">
              <Input
                name="telefono"
                type="tel"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="pr-10"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-pink-300" />
            </div>

            <div className="relative">
              <Input
                name="contrasena"
                type="password"
                placeholder="Contraseña"
                value={formData.contrasena}
                onChange={handleInputChange}
                className="pr-10"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-pink-300" />
            </div>

            <p className="text-xs text-pink-600">
              La contraseña debe contener mínimo 8 caracteres, una mayúscula y un número
            </p>

            <Button 
              type="submit"
              className="w-full bg-pink-700 hover:bg-pink-800"
            >
              Registrarme
            </Button>

            <p className="text-center text-sm text-pink-900">
              Ya tienes cuenta?{" "}
              <Button
                variant="link"
                className="text-pink-700 p-0"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </Button>
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
  
    const renderUserTypeSelection = () => (
    <div className="text-center space-y-8 p-4">
      <h1 className="text-3xl font-bold">¡Hola {userName || 'Usuario'}!</h1>
      <p className="text-gray-600">¿Prefieres recibir ayuda o ser quien la ofrece?</p>
      
      <div className="space-y-8">
        <button
          onClick={() => handleUserTypeSelect('asistido')}
          className="w-full space-y-2"
        >
          <div className="mx-auto w-32 h-32 bg-blue-100 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Persona mayor"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-blue-600">Prefiero ser asistido</p>
        </button>
        <button
          onClick={() => handleUserTypeSelect('asistir')}
          className="w-full space-y-2"
        >
          <div className="mx-auto w-32 h-32 bg-pink-100 rounded-full overflow-hidden">
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Persona joven"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-pink-600">Prefiero asistir</p>
        </button>
      </div>
    </div>
  )
  const renderInfoForm = () => (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setStep(3)}
          className="p-0"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">¡Queremos conocerte mejor, {userName || 'Usuario'}!</h1>
      </div>
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">INFORMACIÓN:</h2>
          <div className="space-y-3">
            <div className="relative">
              <Input
                name="nombreCompleto"
                placeholder="Nombre completo"
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                className="bg-white/50"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                name="fechaNacimiento"
                type="text"
                placeholder="Fecha de nacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                className="bg-white/50"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleInputChange}
                className="bg-white/50"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                name="localidad"
                placeholder="Localidad"
                value={formData.localidad}
                onChange={handleInputChange}
                className="bg-white/50"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-4">DESCRIPCIÓN:</h2>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                name="actividades"
                placeholder="Contanos sobre tus actividades diarias"
                value={formData.actividades}
                onChange={handleInputChange}
                className="bg-white/50 min-h-[100px]"
              />
              <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="bg-white/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">¿Cómo evaluarías el nivel de su actividad física?</p>
              <RadioGroup
                value={formData.nivelActividad}
                onValueChange={(value) => setFormData({ ...formData, nivelActividad: value })}
                className="space-y-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="alta" id="alta" />
                  <Label htmlFor="alta" className="ml-2">Alta</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="media" id="media" />
                  <Label htmlFor="media" className="ml-2">Media</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="baja" id="baja" />
                  <Label htmlFor="baja" className="ml-2">Baja</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="bg-white/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-3">¿Tienes alguna enfermedad/discapacidad/otro?</p>
              <RadioGroup
                value={formData.tieneEnfermedad}
                onValueChange={(value) => setFormData({ ...formData, tieneEnfermedad: value })}
                className="space-y-2"
              >
                <div className="flex items-center">
                  <RadioGroupItem value="si" id="si" />
                  <Label htmlFor="si" className="ml-2">Si</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="ml-2">No</Label>
                </div>
              </RadioGroup>
            </div>
            {formData.tieneEnfermedad === 'si' && (
              <div className="relative">
                <Input
                  name="enfermedad"
                  placeholder="En caso de afirmativo, ¿Cuál?"
                  value={formData.enfermedad}
                  onChange={handleInputChange}
                  className="bg-white/50"
                />
                <XCircle className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <Button
          className="w-full bg-teal-600 hover:bg-teal-700 text-white"
          onClick={handleSubmitForm}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
  const renderSuccessScreen = () => (
    <div className="min-h-screen bg-cyan-50 relative overflow-hidden">
      {/* Top curved shape */}
      <div className="absolute top-0 right-0 w-full h-40 bg-cyan-100 rounded-bl-[100%]" />
      
      {/* Bottom curved shape */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-pink-200 rounded-tr-[100%]" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">¡Está todo listo!</h1>
        <p className="text-xl mb-6">Bienvenido a</p>
        
        <div className="mb-6">
          <div className="rounded-full bg-pink-200 p-4">
            <HandshakeIcon className="h-12 w-12 text-pink-700" />
          </div>
          <p className="text-pink-700 font-semibold mt-2">COMPANIO</p>
        </div>
        
        <h2 className="text-2xl font-bold">¡Empecemos!</h2>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-cyan-50">
      <div className="container mx-auto max-w-md">
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
      </div>
    </div>
  )
}