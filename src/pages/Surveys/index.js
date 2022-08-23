// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Surveys() {
  return (
    <Page title="Encuestas">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Encuestas
        </Typography>

      </Container>
    </Page>
  );
}

export { Surveys };
