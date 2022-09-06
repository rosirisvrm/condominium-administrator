// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function VisitDetail() {
  return (
    <Page title="Detalle de Visita">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Visita
        </Typography>

      </Container>
    </Page>
  );
}

export { VisitDetail };
