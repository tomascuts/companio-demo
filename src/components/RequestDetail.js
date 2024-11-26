import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';

const RequestDetail = ({ request, onBack }) => {
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
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ textTransform: 'none', width: 'fit-content', alignSelf: 'center' }}
        >
          Aceptar solicitud
        </Button>
        {request.state === 'Pending' && (
        <Button 
          variant="contained"
          color="error"
          fullWidth
          sx={{ textTransform: 'none', width: 'fit-content', alignSelf: 'center' }}
          onClick={onBack}
        >
          Rechazar solicitud
        </Button>
        )}
        {request.state === 'In Progress' && (
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ textTransform: 'none', width: 'fit-content', alignSelf: 'center' }}
          onClick={onBack}
        >
          Terminar servicio
        </Button>
        )}
      </Box>
    </Box>
  );
};

export default RequestDetail;
