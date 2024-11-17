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

import theme from './styles/theme';
import { services } from './data/servicesData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); //Controla si el Usuario ha iniciado sesión o no
  const [value, setValue] = useState(1); //Indica la pestaña seleccionada en la navegación inferior (BottomNav)
  const [searchTerm, setSearchTerm] = useState(''); // Guarda el término de búsqueda ingresado por el usuario
  const [filteredServices, setFilteredServices] = useState(services); //Guarda los servicios filtrados de acuerdo al término de búsqueda
  const [selectedService, setSelectedService] = useState(null); //Maneja que servicio específico se está visualizando en pantalla
  const [selectedProvider, setSelectedProvider] = useState(null); //Maneja que Proveedor específico se está visualizando en pantalla
  const [fetchServices, setServices] = useState(services); //Guarda los servicios obtenidos de la API

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
  
    fetchServices();
  }, []);
  console.log(services);
  // useEffect(() => {
  //   const results = services.filter(service =>
  //     service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     service.description.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredServices(results);
  // }, [searchTerm]);
// console.log(services);
  const handleLogin = () => { //Activa la autenticación cambiando isAuthenticated a true.
    setIsAuthenticated(true);
  };

  const handleSearchChange = (event) => { //Actualiza searchTerm cada vez que el usuario escribe en la barra de búsqueda (SearchBar).
    setSearchTerm(event.target.value);
  };

  const handleServiceSelect = (service) => { // Guarda el Servicio seleccionado, mostrando su información detallada
    console.log('Selected Service:', service);
    setSelectedService(service);
  };

  const handleBackClick = () => { // Vuelve atrás, deshaciendo la selección del proveedor o servicio.
    if (selectedProvider) {
      setSelectedProvider(null);
    } else if (selectedService) {
      setSelectedService(null);
    }
  };
  
  const handleProviderSelect = (provider) => { // Guarda el Proveedor seleccionado, mostrando su información detallada
    setSelectedProvider(provider);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthenticated ? (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header selectedService={selectedService} selectedProvider={selectedProvider} handleBackClick={handleBackClick} />
          <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
            {!selectedService && !selectedProvider ? (
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
                <ProviderList providers={selectedService.providers} handleProviderSelect={handleProviderSelect} />
              </>
            ) : (
              <DetailedViewProvider selectedProvider={selectedProvider}/>
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