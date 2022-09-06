// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Permissions() {
  return (
    <Page title="Permisos">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Permisos
        </Typography>

      </Container>
    </Page>
  );
}

export { Permissions };
