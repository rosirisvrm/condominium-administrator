// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Providers() {
  return (
    <Page title="Proveedores">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Proveedores
        </Typography>

      </Container>
    </Page>
  );
}

export { Providers };
