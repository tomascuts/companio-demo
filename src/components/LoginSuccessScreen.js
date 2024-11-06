import React from 'react'
import { Box, Typography } from '@mui/material'
import { Handshake as HandshakeIcon } from '@mui/icons-material'

export default function LoginSuccessScreen() {
  return (
    <Box 
      minHeight="100vh" 
      bgcolor="cyan.50" 
      position="relative" 
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={2}
    >
      <Box 
        position="absolute" 
        top={0} 
        right={0} 
        width="100%" 
        height="160px" 
        bgcolor="cyan.100" 
        borderBottomLeftRadius="100%"
      />
      <Box 
        position="absolute" 
        bottom={0} 
        left={0} 
        width="100%" 
        height="160px" 
        bgcolor="pink.200" 
        borderTopRightRadius="100%"
      />
      <Box position="relative" zIndex={1}>
        <Typography variant="h4" fontWeight="bold" mb={2}>¡Está todo listo!</Typography>
        <Typography variant="h6" mb={3}>Bienvenido a</Typography>
        <Box mb={3}>
          <Box bgcolor="pink.200" borderRadius="50%" p={2} display="inline-block">
            <HandshakeIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          </Box>
          <Typography variant="h6" color="primary.main" fontWeight="bold" mt={1}>
            COMPANIO
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight="bold">¡Empecemos!</Typography>
      </Box>
    </Box>
  )
}