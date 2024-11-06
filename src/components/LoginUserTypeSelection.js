import React from 'react'
import { Box, Typography } from '@mui/material'

export default function LoginUserTypeSelection({ userName, handleUserTypeSelect }) {
  return (
    <Box textAlign="center" p={2}>
      <Typography variant="h4" gutterBottom>¡Hola {userName || 'Usuario'}!</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        ¿Prefieres recibir ayuda o ser quien la ofrece?
      </Typography>
      
      <Box display="flex" flexDirection="column" gap={4} mt={4}>
        {[
          { type: 'asistido', label: 'Prefiero ser asistido', color: 'primary', avatar: '/avatar-asistido.avif' },
          { type: 'asistir', label: 'Prefiero asistir', color: 'secondary', avatar: '/avatar-asistir.webp' }
        ].map((option) => (
          <Box 
            key={option.type}
            onClick={() => handleUserTypeSelect(option.type)}
            sx={{ cursor: 'pointer' }}
          >
            <Box 
              width={128} 
              height={128} 
              bgcolor={`${option.color}.light`}
              borderRadius="50%" 
              mx="auto" 
              mb={1}
              overflow="hidden"
            >
              <img
                src={option.avatar}
                alt={option.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Typography color={option.color}>{option.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}