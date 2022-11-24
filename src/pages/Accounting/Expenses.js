// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Expenses() {
  return (
    <Page title="Egresos">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Egresos
        </Typography>

      </Container>
    </Page>
  );
}

export { Expenses };
