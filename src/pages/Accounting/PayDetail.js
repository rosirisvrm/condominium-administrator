// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function PayDetail() {
  return (
    <Page title="Detalle de Pago">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Pago
        </Typography>

      </Container>
    </Page>
  );
}

export { PayDetail };
