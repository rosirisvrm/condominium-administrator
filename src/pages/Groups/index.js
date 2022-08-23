// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Groups() {
  return (
    <Page title="Grupos">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Grupos
        </Typography>

      </Container>
    </Page>
  );
}

export { Groups };
