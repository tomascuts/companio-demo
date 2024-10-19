import React from 'react';
import { Typography, List, ListItem, Avatar, Rating, Button, Chip, Box } from '@mui/material';
import { ShoppingCart, Wifi, Pets, Computer, People, Place } from '@mui/icons-material';


//Exportar conts
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
        <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
          Solicitar
        </Button>
      </Box>
    );
  };
  
  export default DetailedViewProvider;