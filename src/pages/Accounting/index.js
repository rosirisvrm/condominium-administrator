// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Accounting() {
  return (
    <Page title="Contabilidad">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Contabilidad
        </Typography>

      </Container>
    </Page>
  );
}

export { Accounting };
