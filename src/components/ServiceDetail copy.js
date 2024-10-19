// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, InputBase, Paper, List, ListItem, ListItemIcon, ListItemText, BottomNavigation, BottomNavigationAction, ThemeProvider, createTheme, CssBaseline, IconButton, Avatar, Rating } from '@mui/material';
// import { Search, Home, Favorite, List as ListIcon, ShoppingCart, Wifi, Pets, Computer, People, Place, ArrowBack } from '@mui/icons-material';
// import { styled } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#FFB6C1',
//     },
//     background: {
//       default: '#FFF0F0',
//     },
//   },
//   typography: {
//     fontFamily: 'Arial, sans-serif',
//   },
// });

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(1),
//   display: 'flex',
//   alignItems: 'center',
//   width: '100%',
//   backgroundColor: theme.palette.primary.main,
//   borderRadius: 20,
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   marginLeft: theme.spacing(1),
//   flex: 1,
// }));

// const ServiceItem = styled(ListItem)(({ theme }) => ({
//   backgroundColor: '#FFFFFF',
//   borderRadius: 10,
//   marginBottom: theme.spacing(1),
//   '&:last-child': {
//     marginBottom: 0,
//   },
// }));

// const services = [
//   { 
//     id: 1,
//     name: 'Supermercado', 
//     description: 'El servicio incluye acompañamiento desde la casa hasta el supermercado deseado, ayuda con la selección de productos y su transporte hasta el domicilio de vuelta.',
//     icon: <ShoppingCart />,
//     providers: [
//       { name: 'Fernando López', location: 'San Isidro - 24 años', occupation: 'Amante de las mascotas', rating: 4.5 },
//       { name: 'Amadeo Nonso', location: 'San Fernando - 28 años', occupation: 'Estudiante de medicina', rating: 4.1 },
//       { name: 'Florencia Sirten', location: 'Martinez - 20 años', occupation: 'Empleada', rating: 4.0 },
//       { name: 'Camila Martinez', location: 'Olivos - 26 años', occupation: 'Profesora', rating: 3.5 },
//     ]
//   },
//   { id: 2, name: 'Tecnología', description: 'Ayuda con dispositivos tecnológicos', icon: <Wifi /> },
//   { id: 3, name: 'Mascotas', description: 'Ayuda con el paseo de tu mascota', icon: <Pets /> },
//   { id: 4, name: 'Tramites online', description: 'Ayuda con tus tramites online', icon: <Computer /> },
//   { id: 5, name: 'Acompañamiento', description: 'Servicio de acompañamiento', icon: <People /> },
//   { id: 6, name: 'Tramites presenciales', description: 'Ayuda y acompañamiento al lugar', icon: <Place /> },
// ];

// export default function HomePage() {
//   const [value, setValue] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredServices, setFilteredServices] = useState(services);
//   const [selectedService, setSelectedService] = useState(null);

//   useEffect(() => {
//     const results = services.filter(service =>
//       service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       service.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredServices(results);
//   }, [searchTerm]);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleServiceSelect = (service) => {
//     setSelectedService(service);
//   };

//   const handleBackClick = () => {
//     setSelectedService(null);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
//         <AppBar position="static" color="primary" elevation={0}>
//           <Toolbar>
//             {selectedService && (
//               <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
//                 <ArrowBack />
//               </IconButton>
//             )}
//             <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
//               {selectedService ? selectedService.name : 'Companio'}
//             </Typography>
//             <Typography variant="body2">
//               9:30
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         <div style={{ padding: '16px', flex: 1, overflow: 'auto' }}>
//           {!selectedService ? (
//             <>
//               <StyledPaper>
//                 <Search />
//                 <StyledInputBase
//                   placeholder="Busca por servicio o persona"
//                   inputProps={{ 'aria-label': 'search' }}
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </StyledPaper>

//               <List sx={{ marginTop: '16px' }}>
//                 {filteredServices.map((service) => (
//                   <ServiceItem button key={service.id} onClick={() => handleServiceSelect(service)}>
//                     <ListItemIcon>{service.icon}</ListItemIcon>
//                     <ListItemText primary={service.name} secondary={service.description} />
//                   </ServiceItem>
//                 ))}
//               </List>
//               {filteredServices.length === 0 && (
//                 <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
//                   No se encontraron servicios que coincidan con la búsqueda.
//                 </Typography>
//               )}
//             </>
//           ) : (
//             <>
//               <Typography variant="body1" sx={{ mb: 2 }}>
//                 {selectedService.description}
//               </Typography>
//               <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
//                 Resultados de asistentes cerca de su zona
//               </Typography>
//               <List>
//                 {selectedService.providers?.map((provider, index) => (
//                   <ListItem key={index} sx={{ backgroundColor: 'white', borderRadius: '10px', mb: 1 }}>
//                     <Avatar sx={{ mr: 2 }}>{provider.name[0]}</Avatar>
//                     <ListItemText 
//                       primary={provider.name} 
//                       secondary={
//                         <>
//                           <Typography component="span" variant="body2" color="text.primary">
//                             {provider.location}
//                           </Typography>
//                           <br />
//                           {provider.occupation}
//                         </>
//                       } 
//                     />
//                     <Rating value={provider.rating} readOnly size="small" />
//                   </ListItem>
//                 ))}
//               </List>
//             </>
//           )}
//         </div>

//         <BottomNavigation
//           value={value}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           showLabels
//           sx={{ backgroundColor: theme => theme.palette.primary.main }}
//         >
//           <BottomNavigationAction label="Mis solicitudes" icon={<ListIcon />} />
//           <BottomNavigationAction label="Home" icon={<Home />} />
//           <BottomNavigationAction label="Favoritos" icon={<Favorite />} />
//         </BottomNavigation>
//       </div>
//     </ThemeProvider>
//   );
// }