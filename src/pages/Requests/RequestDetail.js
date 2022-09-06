// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function RequestDetail() {
  return (
    <Page title="Detallde de Solicitud o Sugerencia">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
            Detallde de Solicitud o Sugerencia
        </Typography>

      </Container>
    </Page>
  );
}

export { RequestDetail };
