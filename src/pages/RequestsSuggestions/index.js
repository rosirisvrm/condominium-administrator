// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function RequestsSuggestions() {
  return (
    <Page title="Solicitudes y Sugerencias">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Solicitudes y Sugerencias
        </Typography>

      </Container>
    </Page>
  );
}

export { RequestsSuggestions };
