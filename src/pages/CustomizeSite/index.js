// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function CustomizeSite() {
  return (
    <Page title="Personalizar Sitio">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Personalizar Sitio
        </Typography>

      </Container>
    </Page>
  );
}

export { CustomizeSite };
