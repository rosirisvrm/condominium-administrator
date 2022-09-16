import React from 'react';
import { useParams } from 'react-router-dom'
// @mui
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
//
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function UserDetail() {

  const { id } = useParams()

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const user = {
    id,
    name: 'Ann Bode',
    identification: '0000000',
    address: 'C-2-3',
    role: 'Propietario',
    phone: '98271928',
    email: 'annbode@example.com'
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Detalle de Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Usuario
        </Typography>

        <FormCard>   
          <form>
            <Grid container spacing={2}>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input 
                    label='Nombre y Apellido'
                    inputValue={user.name}
                    disabled
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Cédula de Identidad'
                    inputValue={user.identification}
                    disabled
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Dirección'
                    inputValue={user.address}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Rol'
                    inputValue={user.role}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Teléfono'
                    inputValue={user.phone}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Correo electrónico'
                    inputValue={user.email}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                mt={8}
              >
                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <OutlinedButton 
                    isRouterLink 
                    path="/dashboard/usuarios"
                    defaultPadding
                  >
                    Volver
                  </OutlinedButton>
                </GridStyle>
              </Grid>

            </Grid>
          </form>
        </FormCard>

      </Container>
    </Page>
  );
}

export { UserDetail };
