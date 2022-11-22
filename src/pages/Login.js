// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import { Logo } from '../components/Logo';
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
    padding: theme.spacing(0, 9),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
}));

// ----------------------------------------------------------------------

function Login() {

  const auth = useSelector(state => state.auth.user);

  const mdUp = useResponsive('up', 'md');

  if(auth) return(<Navigate to='/dashboard/home' />)

  return (
    <Page title="Login">
      <HeaderStyle>
        {mdUp ? <Logo width={160} height={100} disabledLink /> : <Logo disabledLink />}
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