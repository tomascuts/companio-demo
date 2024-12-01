import { IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Logo from './Logo';
import { Height } from '@mui/icons-material';

const Header = ({ selectedService,selectedProvider, handleBackClick }) => {
  return (
    <AppBar position="static" color="primary" elevation={0} sx={{padding: "0px 0px"}}>
      <Toolbar sx={{textAlign: "center", color: "#953F39", padding: "0px 0px"}}>
        {(selectedService || selectedProvider) && (
          <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back" >
            <ArrowBack  />
          </IconButton>
        )}
        <Logo size= "100px" ></Logo>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Companio
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;