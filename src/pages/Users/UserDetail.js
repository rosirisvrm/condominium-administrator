import React from 'react';
import { useParams } from 'react-router-dom'
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';

// ----------------------------------------------------------------------

function UserDetail() {

  const { id } = useParams()

  const user = {
    id,
    name: 'Ann Bode',
    identification: '0000000',
    address: 'C-2-3',
    role: 'Propietario',
    phone: '98271928',
    email: 'annbode@example.com'
  }

  return (
    <Page title="Detalle de Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Usuario
        </Typography>

        <FormCard>   
          <form>
            <Grid container spacing={2}>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                   <Input 
                    label='Nombre y Apellido'
                    inputValue={user.name}
                    disabled
                   />
                </Grid>

                <Grid item xs={6}>
                  <Input 
                    label='Cédula de Identidad'
                    inputValue={user.identification}
                    disabled
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={12}>
                <Grid item xs={6}>
                  <Input 
                    label='Dirección'
                    inputValue={user.address}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input 
                    label='Rol'
                    inputValue={user.role}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                  <Input 
                    label='Teléfono'
                    inputValue={user.phone}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
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
                <OutlinedButton 
                  isRouterLink 
                  path="/dashboard/usuarios"
                  defaultPadding
                  defaultMarginRight
                >
                  Volver
                </OutlinedButton>
              </Grid>

            </Grid>
          </form>
        </FormCard>

      </Container>
    </Page>
  );
}

export { UserDetail };
