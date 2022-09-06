// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function CreateUser() {
  return (
    <Page title="Crear Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Usuario
        </Typography>

      </Container>
    </Page>
  );
}

export { CreateUser };
