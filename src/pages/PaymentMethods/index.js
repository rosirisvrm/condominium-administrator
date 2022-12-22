// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function PaymentMethods() {
  return (
    <Page title="Métodos de Pago">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Métodos de Pago
        </Typography>

      </Container>
    </Page>
  );
}

export { PaymentMethods };
