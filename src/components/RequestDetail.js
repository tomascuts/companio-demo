import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const RequestDetail = ({ request, providerId, stateInProgress, onBack }) => {
  const [openDialog, setOpenDialog] = useState(false); // Estado para manejar la visibilidad del diálogo
  
  const stateOrder = ['In Progress', 'Pending', 'Completed'];
  
  // Método para aceptar la solicitud
  const handleAcceptRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/requests/${providerId}/request/${request.requestId}`, {
        state: 'In Progress',
      });
      console.log('Request updated:', response.data);
      onBack(); // Volver a la pantalla anterior después de actualizar
    } catch (error) {
      console.error('Error updating request:', error);
      
    }
  };

    // Método para rechazar la solicitud
    const handleRejectRequest = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/requests/${providerId}/request/${request.requestId}`, {
          state: 'Rejected',
        });
        console.log('Request updated:', response.data);
        onBack(); // Volver a la pantalla anterior después de actualizar
      } catch (error) {
        console.error('Error updating request:', error);
      }
    };

    // Método para completar la solicitud
    const handleCompleteRequest = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/requests/${providerId}/request/${request.requestId}`, {
          state: 'Completed',
        });
        console.log('Request updated:', response.data);
        // onBack(); // Volver a la pantalla anterior después de actualizar
      } catch (error) {
        console.error('Error updating request:', error);
        
      }
    };

  // Ejecutar handleCompleteRequest automáticamente cuando se abre el diálogo
  useEffect(() => {
    if (openDialog) {
      handleCompleteRequest();
      const timer = setTimeout(() => {
        setOpenDialog(false);
        onBack();
      }, 3000); // Cerrar el diálogo después de 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [openDialog]);

  return (
    <Box
      sx={{
        maxWidth: '375px',
        margin: '0 auto',
        padding: '16px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap="16px">
        <Avatar
          src="/path-to-avatar.jpg" // Aquí puedes usar la imagen de un avatar real
          alt="Ricardo Rodríguez"
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h6" color="text.primary">
            {request.assisted}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            request.
            San Isidro
          </Typography>
          <Typography variant="body2" color="text.secondary">
            75 años
          </Typography>
        </Box>
      </Box>

      {/* Service Info */}
      <Box mt={3}>
        <Typography variant="h5" color="primary">
          {request.services}
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          {request.description}
        </Typography>
      </Box>

      {/* Payment Info */}
      <Box mt={3} display="flex" alignItems="center" gap="16px">
        <Typography variant="body2" color="text.primary">
          {request.methodPayment}
        </Typography>
        <Typography variant="h6" color="text.primary">
          ${request.amountPayment}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box mt={3} display="flex" flexDirection="column">
      {request.state === 'Pending' && (
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ textTransform: 'none', width: '155px', alignSelf: 'center' }}
          disabled={stateInProgress}
          onClick={handleAcceptRequest}
        >
          Aceptar solicitud
        </Button>
      )}
        {request.state === 'Pending' && (
        <Button 
          variant="contained"
          color="error"
          fullWidth
          sx={{ textTransform: 'none', width: '155px', alignSelf: 'center' }}
          onClick={handleRejectRequest}
        >
          Rechazar solicitud
        </Button>
        )}
              {request.state === 'In Progress' && (
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ textTransform: 'none', width: '155px', alignSelf: 'center' }}
        >
          Ir al chat
        </Button>
      )}
        {request.state === 'In Progress' && (
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ textTransform: 'none', width: '155px', alignSelf: 'center' }}
          onClick={() => setOpenDialog(true)}
        >
          Terminar servicio
        </Button>
        )}
      </Box>
            {/* Diálogo para confirmar la finalización del servicio */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¡Genial!</DialogTitle>
        <DialogContent>
          <Typography>Has terminado tu servicio. Concluye con el pago en efectivo y estarás listo para ayudar con nuevas solicitudes.</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default RequestDetail;
