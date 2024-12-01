import React from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography } from '@mui/material';

const PaymentPopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle sx={{backgroundColor: "#FBCCC8", color: '#953F39', fontWeight:"bold"}} >Proceso de contratación</DialogTitle>
      <DialogContent sx={{ textAlign: 'center',backgroundColor: "#FBCCC8" }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#953F39', fontWeight:"bold" }}>
          ¡Felicitaciones!
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Tu asistente aceptó tu solicitud. Elegí tu medio de pago.
        </Typography>
        <Button onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#D56A6A',
            color: '#000',
            borderRadius: '8px',
            width: '100%',
            mb: 1,
          }}
          
        >
          Efectivo
        </Button>
        {/* <Button onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#D56A6A',
            color: '#000',
            borderRadius: '8px',
            width: '100%',
          }}
        >
          Mercado Pago
        </Button> */}
      </DialogContent>
    </Dialog>
  );
};
export default PaymentPopup;