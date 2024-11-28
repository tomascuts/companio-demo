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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Controla si el Usuario ha iniciado sesión
  const [value, setValue] = useState(1); // Indica la pestaña seleccionada en la navegación inferior (BottomNav)
  const [searchTerm, setSearchTerm] = useState(''); // Guarda el término de búsqueda
  const [services, setServices] = useState([]); // Guarda los servicios obtenidos de la API
  const [filteredServices, setFilteredServices] = useState([]); // Guarda los servicios filtrados
  const [selectedService, setSelectedService] = useState(null); // Guarda el servicio seleccionado
  const [selectedProvider, setSelectedProvider] = useState(null); // Guarda el proveedor seleccionado



  // Filtra los servicios cuando cambia el término de búsqueda
  useEffect(() => {
    const results = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results); // Actualiza los servicios filtrados
  }, [searchTerm, services]);

  const handleLogin = () => {
    setIsAuthenticated(true); // Activa la autenticación
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
              <ProviderList selectedService={selectedService} handleProviderSelect={handleProviderSelect} />
            </>
          ) : (
            <DetailedViewProvider selectedProvider={selectedProvider} />
          )}
        </div>
        <BottomNav value={value} setValue={setValue} />
      </div>
    </ThemeProvider>
  );
  
}

export default App;


























