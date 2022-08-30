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
          <Typography variant="h4" paragraph>
            Lo sentimos, página no encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            No pudimos encontrar la página que estás buscando. 
            ¿Quizás has escrito mal la URL?
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/house_searching.svg"
            sx={{ height: 200, mx: 'auto', my: 5 }}
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
