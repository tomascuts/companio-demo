import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Paper, List, ListItem, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Search, Home, Favorite, List as ListIcon, ShoppingCart, Wifi, Pets, Computer, People, Place } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFB6C1',
    },
    background: {
      default: '#FFF0F0',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  borderRadius: 20,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const ServiceItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const services = [
  { name: 'Supermercado', description: 'Ayuda con las compras', icon: <ShoppingCart /> },
  { name: 'Tecnología', description: 'Ayuda con dispositivos tecnológicos', icon: <Wifi /> },
  { name: 'Mascotas', description: 'Ayuda con el paseo de tu mascota', icon: <Pets /> },
  { name: 'Tramites online', description: 'Ayuda con tus tramites online', icon: <Computer /> },
  { name: 'Acompañamiento', description: 'Servicio de acompañamiento', icon: <People /> },
  { name: 'Tramites presenciales', description: 'Ayuda y acompañamiento al lugar', icon: <Place /> },
];

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
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Companio
            </Typography>
            <Typography variant="body2">
              9:30
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
          <StyledPaper>
            <Search />
            <StyledInputBase
              placeholder="Busca por servicio o persona"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </StyledPaper>

          <List sx={{ marginTop: '16px' }}>
            {filteredServices.map((service, index) => (
              <ServiceItem button key={index}>
                <ListItemIcon>{service.icon}</ListItemIcon>
                <ListItemText primary={service.name} secondary={service.description} />
              </ServiceItem>
            ))}
          </List>
          {filteredServices.length === 0 && (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              No se encontraron servicios que coincidan con la búsqueda.
            </Typography>
          )}
        </div>

        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          sx={{ backgroundColor: theme => theme.palette.primary.main }}
        >
          <BottomNavigationAction label="Mis solicitudes" icon={<ListIcon />} />
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Favoritos" icon={<Favorite />} />
        </BottomNavigation>
      </div>
    </ThemeProvider>
  );
}