import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

const PaymentPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Proceso de contratación</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#D56A6A' }}>
          ¡Felicitaciones!
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Tu asistente aceptó tu solicitud. Elegí tu medio de pago.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#D56A6A',
            color: '#FFF',
            borderRadius: '8px',
            width: '100%',
            mb: 1,
          }}
        >
          Efectivo
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#D56A6A',
            color: '#FFF',
            borderRadius: '8px',
            width: '100%',
          }}
        >
          Mercado Pago
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPopup;
