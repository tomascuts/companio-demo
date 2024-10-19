import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Favorite, List as ListIcon } from '@mui/icons-material';

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
      <BottomNavigationAction label="Mis solicitudes" icon={<ListIcon />} />
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Favoritos" icon={<Favorite />} />
    </BottomNavigation>
  );
};

export default BottomNav;


//footer