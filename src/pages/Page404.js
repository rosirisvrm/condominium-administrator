import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Lo sentimos, página no encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          Lo sentimos, no pudimos encontrar la página que estás buscando. 
          ¿Quizás has escrito mal la URL? Asegúrese de revisar su ortografía.
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/error-404.png"
            sx={{ height: 340, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Ir al Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}

export { Page404 };
