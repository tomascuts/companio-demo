import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography } from '@mui/material';
import ServiceItem from './ServiceItem';

const ServiceList = ({ filteredServices, handleServiceSelect }) => {
  // Si no se pasan los servicios filtrados, realizamos la solicitud API dentro del componente
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para hacer la solicitud de servicios cuando el componente se monta
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5001/services');
        console.log('Servicios recibidos:', response.data);
        setServices(response.data); // Actualiza los servicios con los datos de la API
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message || 'Error fetching services');
      } finally {
        setLoading(false); // La carga ha terminado
      }
    };

    fetchServices();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Si no hay servicios filtrados, usamos el estado local de 'services'
  const displayServices = (filteredServices && filteredServices.length > 0) ? filteredServices : services;

  return (
    <>
      {/* Mostrar el mensaje de carga mientras los datos se están obteniendo */}
      {loading && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Cargando servicios...
        </Typography>
      )}

      {/* Mostrar un error si hubo un problema al obtener los servicios */}
      {error && (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2, color: 'red' }}>
          {error}
        </Typography>
      )}

      {/* Si no se encontraron servicios, mostrar mensaje apropiado */}
      {displayServices.length === 0 ? (
        !loading && (
          <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
            No se encontraron servicios disponibles.
          </Typography>
        )
      ) : (
        <List sx={{ marginTop: '16px' }}>
          {displayServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onClick={handleServiceSelect}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default ServiceList;
