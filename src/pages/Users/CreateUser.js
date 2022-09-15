import React from 'react';
import { useParams } from 'react-router-dom'
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


function CreateUser() {

  const { id } = useParams()

  const [name, setName] = React.useState('')
  const [identification, setIdentification] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [role, setRole] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const roleOptions = [
    { label: 'Propietario', value: 0 },
    { label: 'Junta de Condominio', value: 1 },
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    console.log(name, identification, address, role, phone, email);
    setLoading(false)
    setColor('success')
    setOpen(true);
  }

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Usuario`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Usuario`}
        </Typography>

        <FormCard>   
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                   <Input 
                    label='Nombre y Apellido'
                    placeholder='Ingrese nombre y apellido'
                    inputValue={name}
                    setInputValue={setName}
                   />
                </Grid>

                <Grid item xs={6}>
                  <Input 
                    label='Cédula de Identidad'
                    placeholder='Ingrese la cédula de identidad '
                    inputValue={identification}
                    setInputValue={setIdentification}
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={12}>
                <Grid item xs={6}>
                  <Input 
                    label='Dirección'
                    placeholder='Ingrese la dirección'
                    inputValue={address}
                    setInputValue={setAddress}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input 
                    label='Rol'
                    placeholder='Seleccione un rol'
                    inputValue={role}
                    setInputValue={setRole}
                    isSelect
                    selectOptions={roleOptions}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                  <Input 
                    label='Teléfono'
                    placeholder='Ingrese el número de teléfono'
                    inputValue={phone}
                    setInputValue={setPhone}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input 
                    label='Correo electrónico'
                    placeholder='Ingrese el correo electrónico'
                    inputValue={email}
                    setInputValue={setEmail}
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

                <ContainedButton type='submit' defaultPadding loading={loading}>
                  Agregar
                </ContainedButton>
              </Grid>

            </Grid>
          </form>
        </FormCard>

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { CreateUser };
