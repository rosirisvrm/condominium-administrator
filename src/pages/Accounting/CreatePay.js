// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function CreatePay() {
  return (
    <Page title="Enviar Pago">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Enviar Pago
        </Typography>

      </Container>
    </Page>
  );
}

export { CreatePay };
