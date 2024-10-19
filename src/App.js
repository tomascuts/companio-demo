import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ServiceList from './components/ServiceList';
import BottomNav from './components/BottomNav';

import ServiceItem from './components/ServiceItem';
import ProviderList from './components/ProviderList';

import theme from './styles/theme';
import { services } from './data/servicesData';

function App() {
  const [value, setValue] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const results = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(results);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleServiceSelect = (service) => {
    console.log('Selected Service:', service); // Agrega este log
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header selectedService={selectedService} handleBackClick={handleBackClick} />
        <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
          {!selectedService ? (
            <>
              <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
              <ServiceList filteredServices={filteredServices} handleServiceSelect={handleServiceSelect} />
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedService.detailedDescription}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Resultados de asistentes cerca de su zona
              </Typography>
              <ProviderList providers={selectedService.providers} />
            </>
          )}          
        </div>
        <BottomNav value={value} setValue={setValue} />
      </div>
    </ThemeProvider>
  );
}

export default App;