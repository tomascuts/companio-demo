import React, { useState, useEffect } from 'react';
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

import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [value, setValue] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [data, setData] = useState(null);
  

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data.message);
      /*setStep(5);*/
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un error al registrarse');
    }
  };

  useEffect(() => {
    const data = axios.get('http://localhost:5000/api/services')

      .then(response => setData(response.data))
      .catch(error => console.error('Error al obtener datos:', error));

    const results = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  }, [searchTerm]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    handleRegister();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(data)
  };

  const handleServiceSelect = (service) => {
    console.log('Selected Service:', service);
    setSelectedService(service);
  };

  const handleBackClick = () => {
    if (selectedProvider) {
      setSelectedProvider(null);
    } else if (selectedService) {
      setSelectedService(null);
    }
  };
  
  const handleProviderSelect = (provider) => {
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