import React, {useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Pets } from '@mui/icons-material';
import { format } from 'date-fns';
import RequestDetail from './RequestDetail';

const RequestList = ({ requests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null); // Request seleccionado

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


  // Función para manejar la selección del request
  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  // Función para volver a la lista de requests
  const handleBack = () => {
    setSelectedRequest(null);
  };

  return (
    <>
    {selectedRequest ? (
      <RequestDetail request={selectedRequest} onBack={handleBack} />
    ) : (
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
            <ListItem key={index}
            button={state !== 'Completed'} // Hacer clicable solo si el estado no es "Completed"
            onClick={() => {
              if (state !== 'Completed') {
                handleRequestSelect(request);
              }
            }}
          >
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
                    {request.date ? format(new Date(request.date), 'yyyy-MM-dd') : ''}
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
    )}
    </>
  );
};

export default RequestList;