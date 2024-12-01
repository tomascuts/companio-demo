import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, Avatar, Rating, Button, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';import { ShoppingCart, Wifi, Pets, Computer, People, Place, Close as CloseIcon } from '@mui/icons-material';
import PaymentPopup from './PaymentPopUp';

// Función para obtener el ícono correspondiente al servicio
const getServiceIcon = (serviceName) => {
  switch (serviceName) {
    case 'Ayuda con las compras':
      return <ShoppingCart  sx={{color:"#953F39"}}/>;
    case 'Acompañamiento':
      return <People />;
    case 'Mascotas':
      return <Pets />;
    case "Tecnología":
      return <Wifi />;
    case "Trámites Online":
      return <Computer />;
    case "Trámites presenciales":
      return <Place/>
    default:
      return null;
  }
};

const DetailedViewProvider = ({ selectedProvider }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [paymentPopupOpen, setPaymentPopupOpen] = useState(false);

  if (!selectedProvider) {
    return null; // O podrías mostrar un mensaje de "No hay proveedor seleccionado"
  }

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleAccept = () => {
    setOpenPopup(false);
    setShowConfirmationScreen(true);
    // Aquí puedes añadir la navegación a la próxima pantalla.
    // Ejemplo: navigate("/next-screen");
  };

  const handleBack = () => {
    setShowConfirmationScreen(false);
    // Simula un timer de 3 segundos antes de mostrar el Pop-Up
    setTimeout(() => {
      setPaymentPopupOpen(true);
    }, 3000);
  };

    return (
      <>
      {showConfirmationScreen ? (
        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
          height: '60vh',
          backgroundColor: '#FDE9E9',
          borderRadius: "25px"
        }}
      >
        <Typography variant="h4" sx={{ color: '#D56A6A', mb: 2 }}>
          ¡Solicitud enviada!
        </Typography>
        <Typography variant="body1" sx={{ color: '#000000', mb: 2 }}>
          Ahora solo queda esperar a que {selectedProvider.name} confirme tu solicitud. Te notificaremos tan pronto como haya una respuesta.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack} // Botón que inicia el timer
          sx={{
              backgroundColor: '#9E4B4B',
              color: '#FFF',
              borderRadius: '8px',
              padding: '10px 20px',
              mt: 2,
            }}
          >
          Volver
          </Button>
          </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>{selectedProvider.nombre}</Avatar>
        <Typography variant="h5" sx={{ mb: 1 }}>{selectedProvider.nombre}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={selectedProvider.rating} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>{selectedProvider.rating}</Typography>
        </Box>
        <Typography variant="body1" sx={{ mb: 1 }}>{selectedProvider.occupation}</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>{selectedProvider.location}</Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          {selectedProvider.description ? selectedProvider.description : "Sin descripción"}</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>Ofrezco:</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 2 }}>
        {selectedProvider.tareas && selectedProvider.tareas.length > 0 ? (
  selectedProvider.tareas.map((service) => (
    <Chip
      key={service}
      icon={getServiceIcon(service)}
      label={service}
      sx={{ m: 0.5 }}
    />
  ))
) : (
  <Typography variant="body2">No hay tareas disponibles.</Typography> // Mensaje para cuando no haya tareas
)}

        </Box>
        <Typography variant="h6" sx={{ mb: 1 }}>Reseñas:</Typography>
       <List sx={{ width: '100%' }}>
       {selectedProvider.reviews && selectedProvider.reviews.length > 0 ? (
  selectedProvider.reviews.map((review, index) => (
    <ListItem
      key={index}
      sx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: '10px',
        mb: 1
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ mr: 1 }}>{review.author[0]}</Avatar>
        <Typography variant="body1">
          {review.author} - {review.age} años
        </Typography>
      </Box>
      <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
      <Typography variant="body2">{review.comment}</Typography>
    </ListItem>
  ))
) : (
  <Typography variant="body2">No hay reseñas disponibles.</Typography>
)}

        </List>
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }} onClick={handleOpenPopup}>
        Solicitar
       </Button>
          {/* Pop-Up de advertencia */}
          <Dialog open={openPopup} onClose={handleClosePopup}>
      <DialogTitle>
        ¡Gracias por confiar en nosotros!
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
          Al confirmar esta solicitud, permites que {selectedProvider.name} reciba tu petición para ayudarte con esta tarea. En caso de que no pueda aceptar, tendrás la oportunidad de realizar otra solicitud.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAccept} color="primary" variant="contained">
          Sí, estoy de acuerdo
        </Button>
        <Button onClick={handleClosePopup} color="dark">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>


      </Box>
    )}
    {/* Pop-Up final */}
    <PaymentPopup open={paymentPopupOpen} onClose={() => setPaymentPopupOpen(false)} />
  </>
    );
  };
  
  export default DetailedViewProvider;
