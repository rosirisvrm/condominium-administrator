// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Ingresos() {
  return (
    <Page title="Ingresos">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ingresos
        </Typography>

      </Container>
    </Page>
  );
}

export { Ingresos };
