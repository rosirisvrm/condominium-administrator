// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function ExternalCommunication() {
  return (
    <Page title="Comunicación Externa">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Comunicación Externa
        </Typography>

      </Container>
    </Page>
  );
}

export { ExternalCommunication };
