import { Search } from '@mui/icons-material';
import { Paper, InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: theme.palette.primary.main,
  borderRadius: 20,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <StyledPaper>
      <Search />
      <StyledInputBase
        placeholder="Busca por servicio o persona"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </StyledPaper>
  );
};

export default SearchBar;