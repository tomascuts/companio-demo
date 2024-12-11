import { IconButton, AppBar, Toolbar, Typography,Button  } from '@mui/material';
import { ArrowBack, Logout  } from '@mui/icons-material';
import Logo from './Logo';

const Header = ({ selectedService,selectedProvider, handleBackClick }) => {

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <AppBar position="static" color="primary" elevation={0} sx={{padding: "0px 0px"}}>
      <Toolbar sx={{textAlign: "center", color: "#953F39", padding: "0px 10px"}}>
        {(selectedService || selectedProvider) && (
          <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="back" >
            <ArrowBack  />
          </IconButton>
        )}
        <Logo size= "100px" ></Logo>
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Companio
        </Typography>
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<Logout />}
          onClick={handleLogout}
          sx={{ 
            marginLeft: 'auto', 
            textTransform: 'none',
            padding: '8px 4px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: "#D94343",
            },
          }}
        >
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;