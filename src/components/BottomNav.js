import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { List as ListIcon, Home, Favorite } from '@mui/icons-material';

const BottomNav = ({ value, setValue }) => {
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      sx={{ backgroundColor: theme => theme.palette.primary.main }}
    >
      <BottomNavigationAction label="Mis solicitudes" icon={<ListIcon sx={{color:"black"}}/>} />
      <BottomNavigationAction label="Home" icon={<Home sx={{color:"black"}}/>} />
      <BottomNavigationAction label="Favoritos" icon={<Favorite sx={{color:"black"}}/>} />
    </BottomNavigation>
  );
};

export default BottomNav;