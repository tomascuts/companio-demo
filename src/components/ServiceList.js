import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const ServiceItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const ServiceList = ({ filteredServices }) => {
  return (
    <List sx={{ marginTop: '16px' }}>
      {filteredServices.map((service, index) => (
        <ServiceItem button key={index}>
          <ListItemIcon>{service.icon}</ListItemIcon>
          <ListItemText primary={service.name} secondary={service.description} />
        </ServiceItem>
      ))}
    </List>
  );
};

export default ServiceList;