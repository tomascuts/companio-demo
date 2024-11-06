import React from 'react'
import { Box } from '@mui/material'


export default function Logo() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box position="relative" width={364} height={364}>
      <img src="/logo-marca-sf.svg" alt="Logo" width="364" height="364" />
      </Box>
    </Box>
  )
}