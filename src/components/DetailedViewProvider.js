import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Avatar, Rating, Button, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';import { ShoppingCart, Wifi, Pets, Computer, People, Place, Close as CloseIcon } from '@mui/icons-material';


//Exportar conts

// Función para obtener el ícono correspondiente al servicio
const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Supermercado':
        return <ShoppingCart />;
      case 'Acompañamiento':
        return <People />;
      case 'Mascotas':
        return <Pets />;
      default:
        return null;
    }
  };



const DetailedViewProvider = ({selectedProvider}) => {
  // Estado para controlar la visibilidad del Pop-Up
  const [openPopup, setOpenPopup] = useState(false);

   // Función para abrir el Pop-Up
   const handleOpenPopup = () => {
    setOpenPopup(true);
  };

    // Función para cerrar el Pop-Up
    const handleClosePopup = () => {
      setOpenPopup(false);
    };

     // Función para manejar la aceptación y navegación
  const handleAccept = () => {
    setOpenPopup(false);
    // Aquí puedes añadir la navegación a la próxima pantalla.
    // Ejemplo: navigate("/next-screen");
  };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>{selectedProvider.name[0]}</Avatar>
        <Typography variant="h5" sx={{ mb: 1 }}>{selectedProvider.name}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={selectedProvider.rating} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>{selectedProvider.rating}</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>{selectedProvider.occupation}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>{selectedProvider.location}</Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>{selectedProvider.description}</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>Ofrezco:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
          {selectedProvider.services.map((service) => (
            <Chip
              key={service}
              icon={getServiceIcon(service)}
              label={service}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Reseñas:</Typography>
        <List sx={{ width: '100%' }}>
          {selectedProvider.reviews.map((review, index) => (
            <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', borderRadius: '10px', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ mr: 1 }}>{review.author[0]}</Avatar>
                <Typography variant="body1">{review.author} - {review.age} años</Typography>
              </Box>
              <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
              <Typography variant="body2">{review.comment}</Typography>
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }} onClick={handleOpenPopup}>
        Solicitar
       </Button>
          {/* Pop-Up de advertencia */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>
          Advertencia
          <IconButton
            aria-label="close"
            onClick={handleClosePopup}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Al aceptar esta contratación, usted está de acuerdo en esperar a que {selectedProvider.name} acepte su solicitud de ayuda. En caso de que sea denegada, tendrá que volver a solicitar esta tarea.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept} color="primary" variant="contained">
            Sí, acepto
          </Button>
        </DialogActions>
      </Dialog>

      </Box>
    );
  };
  
  export default DetailedViewProvider;