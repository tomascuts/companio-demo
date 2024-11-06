import React from 'react'
import { Box, Typography } from '@mui/material'
import { Favorite as FavoriteIcon, Handshake as HandshakeIcon } from '@mui/icons-material'

export default function Logo() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box position="relative" width={64} height={64}>
        <FavoriteIcon sx={{ fontSize: 64, color: 'primary.main' }} />
        <HandshakeIcon sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: 32
        }} />
      </Box>
      <Typography variant="h6" color="primary.main" fontWeight="bold">
        COMPANIO
      </Typography>
    </Box>
  )
}