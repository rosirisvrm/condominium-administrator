// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function CreateVisit() {
  return (
    <Page title="Crear Visita">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Visita
        </Typography>

      </Container>
    </Page>
  );
}

export { CreateVisit };
