// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Profile() {
  return (
    <Page title="Perfil">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Perfil
        </Typography>

      </Container>
    </Page>
  );
}

export { Profile };
