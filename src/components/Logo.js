import React from 'react'
import { Box } from '@mui/material'


export default function Logo({size}) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} style={{ height: size, width: size }}>
      <Box position="relative" width={364} height={364} style={{ height: size, width: size }}>
      <img src="/logo-marca-sf.svg" alt="Logo" width="364" height="364" style={{ height: size, width: size }} />
      </Box>
    </Box>
  )
}