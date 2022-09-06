// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function UserDetail() {
  return (
    <Page title="Detalle de Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Usuario
        </Typography>

      </Container>
    </Page>
  );
}

export { UserDetail };
