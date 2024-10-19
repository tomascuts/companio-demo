import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, Typography } from '@mui/material';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ServiceList from './components/ServiceList';
import BottomNav from './components/BottomNav';

import theme from './styles/theme';
import { services } from './data/servicesData';


export default function HomePage() {
  const [value, setValue] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
          <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
          <ServiceList filteredServices={filteredServices} />
          {filteredServices.length === 0 && (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              No se encontraron servicios que coincidan con la búsqueda.
            </Typography>
          )}
        </div>
        <BottomNav value={value} setValue={setValue} />
      </div>
    </ThemeProvider>
  );
}