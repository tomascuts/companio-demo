import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Pets } from '@mui/icons-material';
import PetsIcon from '@mui/icons-material/Pets';

const RequestList = ({ requests }) => {

      // Agrupar los requests por proveedor y luego por estado
  const groupedRequests = requests.map((requestProvider) => {
    const groupedByState = requestProvider.requests.reduce((acc, request) => {
      const state = request.state || 'Sin estado';
      if (!acc[state]) {
        acc[state] = [];
      }
      acc[state].push(request);
      return acc;
    }, {});
    return { providerName: requestProvider.providerName, groupedByState };
  });

  return (
    <List>
      {groupedRequests.map((provider) => (
        <React.Fragment key={provider.providerName}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {provider.providerName}
          </Typography>
          {Object.keys(provider.groupedByState).map((state) => (
            <React.Fragment key={state}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                {state === 'Completed' ? 'Históricas' : state === 'Pending' ? 'Pendientes de responder' : state === 'In Progress' ? 'Activas' : state}
              </Typography>
              {provider.groupedByState[state].map((request, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {request.icon}
              </ListItemIcon>
              <ListItemText
                primary={request.services}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {request.assisted}
                    </Typography>
                    <br />
                    {request.date ? request.date : ''}
                    <br />
                    {request.paymentDescription ? request.paymentDescription : ''}
                  </>
                }
              />
            </ListItem>
          ))}
        </React.Fragment>
                  ))}
        </React.Fragment>
      ))}
    </List>
  );
};

export default RequestList;