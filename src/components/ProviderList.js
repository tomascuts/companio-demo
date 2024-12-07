import React, { useState, useEffect } from 'react';
import { Avatar, List, ListItem, ListItemText, Typography, Rating } from '@mui/material';

// Componente que muestra la lista de asistentes
const AssistantList = ({ selectedService, handleProviderSelect }) => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener asistentes desde el backend filtrados por localidad y tarea
  const getAssistants = async (location, serviceName) => {
    console.log('Fetching assistants for location:', location, 'and task:', serviceName);
    try {
      const url = new URL('http://localhost:5001/users');
      const params = { localidad: location, tarea: serviceName, userType: 'asistente' };
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
  
      const data = await response.json();
      console.log('API Response:', data); // Verifica qué estás recibiendo desde la API
  
      if (Array.isArray(data)) {
        setAssistants(data); // Actualiza el estado con los datos recibidos
      } else {
        console.error('Data is not an array', data);
      }
  
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  
  // Usamos useEffect para llamar a la función getAssistants con los valores correctos
  useEffect(() => {
    console.log('hola', selectedService);
    if (selectedService) {
      const serviceName = selectedService.name; // Asegúrate de usar el nombre del servicio correcto
      console.log('Fetching assistants for:', serviceName);
      getAssistants('San Isidro', serviceName); // Llamamos a la función con los valores correctos
    }
  }, [selectedService]); // Solo se ejecuta cuando selectedService cambia
  
  return (
    <div style={{border:"0.5px solid #953F39", borderRadius: "15px", backgroundColor:"#fff8f7", }}>
      {loading ? (
        <Typography variant="h6" color="text.primary">Loading...</Typography>
      ) : (
        <List>
          {assistants.length > 0 ? (
            assistants.map((assistant) => (
              <ListItem
                key={assistant._id}
                sx={{ backgroundColor:"#fff8f7", borderRadius: '10px', mb: 1 }}
                onClick={() => handleProviderSelect(assistant)}  // Aquí se maneja el clic
              >
                <Avatar sx={{ mr: 2 ,fontWeight:"bold", color:"#953F39",backgroundColor:"#fff", border:"0.5px solid #953F39" ,width: 66, height: 66 }}>{assistant.nombre[0]}</Avatar>
                <ListItemText 
                
                  primary={
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: "#000" }}>
                      {assistant.nombre}
                    </Typography>}
                  
                  secondary={
                    <>
                      <Typography component="span" variant="body1" color="text.primary">
                        {assistant.age} años
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.primary">
                        {assistant.direccion.localidad} - {assistant.direccion.calle} {assistant.direccion.numero}
                      </Typography>
                    </>
                  } 
                />
                <Rating value={assistant.rating || 4} readOnly size="small" style={{}}/>
              </ListItem>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary">No assistants found</Typography>
          )}
        </List>
      )}
    </div>
  );
};

export default AssistantList;
