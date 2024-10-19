import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceItem from './ServiceItem';

// const ServiceItem = styled(ListItem)(({ theme }) => ({
//   backgroundColor: '#FFFFFF',
//   borderRadius: 10,
//   marginBottom: theme.spacing(1),
//   '&:last-child': {
//     marginBottom: 0,
//   },
// }));

const ServiceList = ({ filteredServices, handleServiceSelect }) => {
  return (
    filteredServices.length != 0 ?
    (
      <List sx={{ marginTop: '16px' }}>
      {filteredServices.map((service) => (
        <ServiceItem button key={service.id} service={service} onClick={handleServiceSelect} />
      ))}
    </List>
    ) : (
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          No se encontraron servicios que coincidan con la búsqueda.
      </Typography>
    )
  );
};

export default ServiceList;