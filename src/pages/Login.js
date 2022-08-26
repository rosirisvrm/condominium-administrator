// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import { NewLogo } from '../components/NewLogo';
// sections
import { LoginForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    justifyContent: 'start',
    padding: theme.spacing(1, 4, 0, 4),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  // minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
}));

// ----------------------------------------------------------------------

function Login() {

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <HeaderStyle>
        {mdUp ? <NewLogo width={180} height={110} disabledLink /> : <NewLogo disabledLink />}
      </HeaderStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Typography variant="h4" gutterBottom align='center' sx={{ mb: 5 }}>
            Iniciar sesión
          </Typography>

          <LoginForm />

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            ¿No tiene una cuenta?
            Solicite a su administrador el registro en la aplicación.
          </Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}

export { Login };