import { ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledServiceItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  marginBottom: theme.spacing(1),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  '&:last-child': {
    marginBottom: 0,
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'row-reverse',
  },
}));

export default StyledServiceItem;