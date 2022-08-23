// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Visits() {
  return (
    <Page title="Visitas">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Visitas
        </Typography>

      </Container>
    </Page>
  );
}

export { Visits };
