// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Notifications() {
  return (
    <Page title="Notificaciones">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Notificaciones
        </Typography>

      </Container>
    </Page>
  );
}

export { Notifications };
