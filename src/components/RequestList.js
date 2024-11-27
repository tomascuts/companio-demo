import React, {useState} from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ShoppingCart, Pets, Wifi, People, Place, Computer } from '@mui/icons-material';
import { format } from 'date-fns';
import RequestDetail from './RequestDetail';
import axios from 'axios';

const RequestList = ({ requests, setRequests }) => {
  const [selectedRequest, setSelectedRequest] = useState(null); // Request seleccionado
  const [selectedProviderId, setSelectedProviderId] = useState(null); // Estado para manejar el providerId seleccionado
  const [inProgress, setInProgress] = useState(null); // Bool para saber si hay un request en progreso

  const stateOrder = ['In Progress', 'Pending', 'Completed'];

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

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

    const hasInProgress = requestProvider.requests.some(request => request.state === 'In Progress');

    return { providerName: requestProvider.providerName,
             providerId: requestProvider.providerId, 
             groupedByState,
             inProgress: hasInProgress};
  });


  // Función para manejar la selección del request
  const handleRequestSelect = (request, providerId, stateInProgress) => {
    setSelectedRequest(request);
    setSelectedProviderId(providerId);
    setInProgress(stateInProgress);
  };

  // Función para volver a la lista de requests
  const handleBack = () => {
    setSelectedRequest(null);
    setSelectedProviderId(null);
    fetchRequests();
  };

  const getIcon = (service) => {
    const iconMap = {
      'Supermercado': <ShoppingCart />,
      'Mascotas': <Pets />,
      'Internet': <Wifi />,
      'Personas': <People />,
      'Ubicación': <Place />,
      'Computadora': <Computer />
    };
    return iconMap[service] || <ShoppingCart />;
  };

  return (
    <>
    {selectedRequest ? (
      <RequestDetail request={selectedRequest} providerId={selectedProviderId} stateInProgress={inProgress} onBack={handleBack} />
    ) : (
    <List>
      {groupedRequests.map((provider) => (
        <React.Fragment key={provider.providerName}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {provider.providerName}
          </Typography>
          {Object.keys(provider.groupedByState)
            .filter((state) => stateOrder.includes(state)) // Filtrar solo los estados definidos
            .sort((a, b) => {
    const orderA = stateOrder.indexOf(a);
    const orderB = stateOrder.indexOf(b);
    return orderA - orderB;
  }).map((state) => (
            <React.Fragment key={state}>
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                {state === 'Pending' ? 'Pendientes de responder' : state === 'Completed' ? 'Históricas' : state === 'In Progress' ? 'Activas' : state}
              </Typography>
              {provider.groupedByState[state].map((request, index) => (
            <ListItem key={index}
            button={state !== 'Completed'} // Hacer clicable solo si el estado no es "Completed"
            onClick={() => {
              if (state !== 'Completed') {
                handleRequestSelect(request, provider.providerId, provider.inProgress);
              }
            }}
          >
              <ListItemIcon>
              {getIcon(request.services)}
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