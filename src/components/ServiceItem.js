import React from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import StyledServiceItem from '../styles/StyledServiceItem';
import { ShoppingCart, Wifi, Pets, Computer, People, Place } from '@mui/icons-material';

const iconMap = {
  ShoppingCart: <ShoppingCart />,
  Wifi: <Wifi />,
  Pets: <Pets />,
  Computer: <Computer />,
  People: <People />,
  Place: <Place />,
};

const ServiceItem = ({ service, onClick }) => (
  <StyledServiceItem onClick={() => onClick(service)}>
    <ListItemIcon>{iconMap[service.icon]}</ListItemIcon>
    <ListItemText 
      primary={service.name} 
      secondary={service.description} 
      sx={{ color: '#953F39', fontWeight: 400 }} 
    />
  </StyledServiceItem>
);

export default ServiceItem;

