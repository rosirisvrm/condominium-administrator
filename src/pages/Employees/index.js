// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Employees() {
  return (
    <Page title="Empleados">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Empleados
        </Typography>

      </Container>
    </Page>
  );
}

export { Employees };
