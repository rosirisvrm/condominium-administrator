import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import { NewLogo } from '../components/NewLogo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    padding: theme.spacing(0, 10),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxHeight: '100vh',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  padding: theme.spacing(4, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 0, 4, 3),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 0, 4, 10),
  },
}));

const ButtonContainer = styled('div')(() => ({
 maxWidth: 400,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center'
}));

const ImageStyle = styled(Box)(({ theme }) => ({
  width: 300,
  height: 300,
  padding: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    position: 'absolute',
    top: 250,
    right: 24,
    width: 400,
  },
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: 230,
    right: 80,
    width: 450,
    padding: theme.spacing(0),
  },
  [theme.breakpoints.up('lg')]: {
    position: 'absolute',
    top: 180,
    right: 80,
    width: 650,
  },
}));

// ----------------------------------------------------------------------

function Landing() {

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  const lgUp = useResponsive('up', 'lg');

  return (
    <Page title="Condominium Administrator">
        <HeaderStyle>
          {mdUp ? <NewLogo width={180} height={110} disabledLink /> : <NewLogo disabledLink />}
          
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained"
              sx={{
                padding: '10px 40px',
                boxShadow: 'none',
              }}
            >
              Login
            </Button>
          </Link>
        </HeaderStyle>

        <Container 
          maxWidth='xl' 
          disableGutters 
          sx={{
            maxHeight: '100vh',
          }}
        > 
          <ContentStyle>
            <Typography variant="h1" sx={{ mb: 4, color: '#3F3D56' }}>
              Nos encargamos de {smUp && <br/>}
              la gestión de tu {smUp && <br/>}
              condominio {smUp && <br/>}
              residencial
            </Typography>

            <Typography variant="body1" sx={{ mb: 5, color: '#637381' }}>
              Una aplicación en la nube para propietarios, {(smUp && !lgUp) && <br/>} junta de condominio {lgUp && <br/>}
              y administrador.
            </Typography>

            <ButtonContainer>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained"
                  sx={{
                    padding: '15px 50px',
                    boxShadow: 'none'
                  }}
                >
                  Ingresa aquí
                </Button>
               </Link> 
            </ButtonContainer>
        
            <ImageStyle>
              <img src="/static/illustrations/condominium.png" alt="landing" />
            </ImageStyle>

          </ContentStyle>   
        </Container>
    </Page>
  );
}

export { Landing };