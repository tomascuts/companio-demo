import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { styled } from '@mui/material/styles';
import StyledServiceItem from '../styles/StyledServiceItem';


const ServiceItem = ({ service, onClick }) => (
  <StyledServiceItem onClick={() => onClick(service)}>
    <ListItemIcon>{service.icon}</ListItemIcon>
    <ListItemText primary={service.name} secondary={service.description} />
  </StyledServiceItem>
);

export default ServiceItem;
