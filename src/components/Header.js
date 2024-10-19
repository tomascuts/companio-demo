import { IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Header = ({ selectedService,selectedProvider, handleBackClick }) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        {(selectedService || selectedProvider) && (
          <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {selectedProvider ? selectedProvider.name : selectedService ? selectedService.name : 'Companio'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;