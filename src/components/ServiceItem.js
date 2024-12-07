import React from 'react';
import { ListItemIcon, ListItemText } from '@mui/material';
import StyledServiceItem from '../styles/StyledServiceItem';
import { ShoppingCart, Wifi, Pets, Computer, People, Place } from '@mui/icons-material';

const iconMap = {
  ShoppingCart: <ShoppingCart sx={{color: "#953F39"}}/>,
  Wifi: <Wifi sx={{color: "#953F39"}}/>,
  Pets: <Pets sx={{color: "#953F39"}}/>,
  Computer: <Computer sx={{color: "#953F39"}}/>,
  People: <People sx={{color: "#953F39"}}/>,
  Place: <Place sx={{color: "#953F39"}}/>,
};

const ServiceItem = ({ service, onClick }) => (
  <StyledServiceItem onClick={() => onClick(service)}>
    <ListItemIcon>{iconMap[service.icon]}</ListItemIcon>
    <ListItemText 
      primary={service.name} 
      secondary={service.description} 
      sx={{ color: '#953F39', fontWeight: "bolder" ,fontSize: "15px"}}
    />
  </StyledServiceItem>
);

export default ServiceItem;

