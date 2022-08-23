// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function News() {
  return (
    <Page title="Noticias">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Noticias
        </Typography>

      </Container>
    </Page>
  );
}

export { News };
