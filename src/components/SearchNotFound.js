import PropTypes from 'prop-types';
// material
import { Paper, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Resusltado no encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se ha encontrado resultado para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
      </Typography>
      <Box
        component="img"
        src="/static/illustrations/searching.svg"
        sx={{ height: 200, mx: 'auto', my: 3 }}
      />
    </Paper>
  );
}
