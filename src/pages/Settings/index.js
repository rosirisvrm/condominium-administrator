// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Settings() {
  return (
    <Page title="Ajustes">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ajustes
        </Typography>

      </Container>
    </Page>
  );
}

export { Settings };
