import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader'
//
import useResponsive from '../../hooks/useResponsive';
import { getUser } from '../../services/users';
import { setUser, setLoadingUser } from '../../slices/usersSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function UserDetail() {

  const { id } = useParams()
  
  const user = useSelector(state => state.users.user)
  const loadingUser = useSelector(state => state.users.loadingUser)
  
  const dispatch = useDispatch()

  const { control, setValue } = useForm({ 
    defaultValues: {
      name: '',
      identification: '',
      address: '',
      role: '',
      phone: '',
      email: '',
    }
  });

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoadingUser(true))
      
      setTimeout(async () => {
        const res = await getUser(id)
        dispatch(setUser(res))
        setFormValues()
        dispatch(setLoadingUser(false))
      }, 1000)
    }

    fetchUser()
  }, [dispatch, id])

  const setFormValues = () => {
    setValue("name", user?.name || '')
    setValue("identification", user?.identification || '')
    setValue("address", user?.address || '')
    setValue("role", user?.role ? user.role.label : '')
    setValue("phone", user?.phone || '')
    setValue("email", user?.email || '')
  }

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Detalle de Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Usuario
        </Typography>

        {loadingUser ?
          <Loader/> :

          <FormCard>   
            <form>
              <Grid container spacing={2}>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='name'
                      label='Nombre y Apellido'
                      disabled
                      type='text'
                      control={control}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input
                      name='identification'
                      label='Cédula de Identidad'
                      disabled
                      type='number'
                      control={control}
                    />
                  </Grid>
                </Grid>
                
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='address'
                      label='Dirección'
                      disabled
                      type='text'
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='role'
                      label='Rol'
                      disabled
                      type='text'
                      control={control}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='phone'
                      label='Teléfono'
                      disabled
                      type='text'
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='email'
                      label='Correo electrónico'
                      disabled
                      type='email'
                      control={control}
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
        }

      </Container>
    </Page>
  );
}

export { UserDetail };
