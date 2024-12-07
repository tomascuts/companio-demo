import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ServiceList from './components/ServiceList';
import BottomNav from './components/BottomNav';
import ProviderList from './components/ProviderList';
import DetailedViewProvider from './components/DetailedViewProvider';
import LoginFlow from './components/LoginFlow';
import RequestList from './components/RequestList';

import theme from './styles/theme';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Controla si el Usuario ha iniciado sesión o no
  const [userRole, setUserRole] = useState(''); //Guarda el rol del usuario
  const [value, setValue] = useState(1); //Indica la pestaña seleccionada en la navegación inferior (BottomNav)
  const [searchTerm, setSearchTerm] = useState(''); // Guarda el término de búsqueda ingresado por el usuario
  const [services, setServices] = useState([]); // Guarda los servicios obtenidos de la API
  const [filteredServices, setFilteredServices] = useState(services); //Guarda los servicios filtrados de acuerdo al término de búsqueda
  const [selectedService, setSelectedService] = useState(null); //Maneja que servicio específico se está visualizando en pantalla
  const [selectedProvider, setSelectedProvider] = useState(null); //Maneja que Proveedor específico se está visualizando en pantalla
  const [fetchServices, setFetchServices] = useState(services); //Guarda los servicios obtenidos de la API
  const [fetchRequests, setRequests] = useState([]); //Guarda los pedidos obtenidos de la API
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5001/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, []);

  useEffect(() => {
    const results = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredServices(results); // Actualiza los servicios filtrados
}, [searchTerm, services]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5001/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
  
    fetchRequests();
  }, []); // Nota que aquí la lista de dependencias está vacía

  const handleLogin = (data) => {
    if (data && data.userType) {  // Verifica que data y userType no sean undefined o null
      const { userType, nombre } = data;
      setIsAuthenticated(true);
      setUserRole(userType || 'asistido');
      setUserName(nombre);
    } else {
      // Si no hay un userType, asignar 'asistido' por defecto
      setIsAuthenticated(true);
      setUserRole('asistido');
    }
  };  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualiza el término de búsqueda
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service); // Guarda el servicio seleccionado
  };

  const handleBackClick = () => {
    if (selectedProvider) {
      setSelectedProvider(null); // Vuelve al servicio seleccionado
    } else if (selectedService) {
      setSelectedService(null); // Vuelve a la lista de servicios
    }
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider); // Guarda el proveedor seleccionado
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
          <Header selectedService={selectedService} selectedProvider={selectedProvider} handleBackClick={handleBackClick} />
          {selectedService && (
          <Typography variant="h6" sx={{ padding: '16px', textAlign: 'center', color: "#953F39", fontWeight: 700,fontSize: "30px" }}>
            {selectedService.name} {/* Título del servicio seleccionado */}
          </Typography>
        )}
          <div style={{ padding: '16px', flex: 1, overflow: 'auto',alignItems: 'center',
          justifyContent: 'center' }}>
          {userRole === 'asistir' ? ( 
            <RequestList user={userName} requests={fetchRequests} setRequests={setRequests} />
            ) : (!selectedService && !selectedProvider) ? (
              <>
                <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
                <ServiceList filteredServices={filteredServices} handleServiceSelect={handleServiceSelect} />
              </>
            ) : selectedService && !selectedProvider ? (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {selectedService.detailedDescription}
                </Typography>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Resultados de asistentes cerca de su zona
                </Typography>
                <ProviderList selectedService={selectedService} handleProviderSelect={handleProviderSelect} />
              </>
            ) : (
              <DetailedViewProvider userName={userName} selectedProvider={selectedProvider} selectedService={selectedService}/>
            )}          
          </div>
          <BottomNav value={value} setValue={setValue} />
        </div>
      ) : (
        <LoginFlow onLogin={handleLogin} />  // Muestra LoginScreen si no ha iniciado sesión
      )}
    </ThemeProvider>
  );
  
}

export default App;


























