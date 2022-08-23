// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Users() {
  return (
    <Page title="Usuarios">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Usuarios
        </Typography>

      </Container>
    </Page>
  );
}

export { Users };
