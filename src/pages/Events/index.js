// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Events() {
  return (
    <Page title="Eventos">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Eventos
        </Typography>

      </Container>
    </Page>
  );
}

export { Events };
