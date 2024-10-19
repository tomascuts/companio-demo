import { IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const Header = ({ selectedService, handleBackClick }) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        {selectedService && (
          <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back">
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          {selectedService ? selectedService.name : 'Companio'}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;