import { Link, Outlet } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

function Users() {
  return (
    <Page title="Usuarios">
      <Container maxWidth="xl">
        <Outlet />

        <Link to='/dashboard/usuarios/crear'>
            Crear
        </Link>

        <Link to='/dashboard/usuarios/editar'>
            Editar
        </Link>

        <Link to='/dashboard/usuarios/detalle'>
            Detalle
        </Link>
      </Container>
    </Page>
  );
}

export { Users };
