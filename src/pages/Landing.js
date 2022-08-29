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
    padding: theme.spacing(0, 9),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4, 3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4, 0, 4, 3),
    alignItems: 'inherit',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4, 0, 4, 9),
  },
}));

const ButtonContainer = styled('div')(() => ({
 maxWidth: 300,
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
}));

const ImageStyle = styled(Box)(({ theme }) => ({
  width: 300,
  height: 300,
  padding: theme.spacing(5, 0),
  [theme.breakpoints.up('sm')]: {
    position: 'absolute',
    top: 200,
    right: 24,
    width: 400,
  },
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: 230,
    right: 72,
    width: 450,
    padding: theme.spacing(0),
  },
  [theme.breakpoints.up('lg')]: {
    position: 'absolute',
    top: 142,
    right: 72,
    width: 600,
  },
}));

// ----------------------------------------------------------------------

function Landing() {

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Condominium Administrator">
        <HeaderStyle>
          {mdUp ? <NewLogo width={160} height={100} disabledLink /> : <NewLogo width={140} height={80} disabledLink />}
          
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained"
              sx={{
                padding: !smUp ? '10px 28px' : '10px 40px',
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
            <Typography variant="h1" sx={{ mb: 3, color: '#3F3D56', lineHeight: 1.15 }}>
              Nos encargamos de {smUp && <br/>}
              la gestión de tu {smUp && <br/>}
              condominio {smUp && <br/>}
              residencial
            </Typography>

            <Typography variant="body1" sx={{ mb: 6, color: '#637381' }}>
              Una aplicación en la nube para propietarios,{(smUp && !mdUp) && <br/>} administrador {(mdUp) && <br/>}
              y junta de condominio.
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