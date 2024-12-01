import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledServiceItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#FFF0F0',
  borderRadius: 10,
  marginBottom: theme.spacing(1),
  boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  border: '3px solid #953F39',
  color: "#953F39",
  fontWeight: "bolder",

  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
  '&:last-child': {
    marginBottom: 0,
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'row-reverse',
  },
}));

export default StyledServiceItem;