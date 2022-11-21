import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
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
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
//
import useResponsive from '../../hooks/useResponsive';
import { getUser, getRoleOptions, putUser } from '../../services/users';
import { setUser, setRoleOptions, setLoadingUser, setLoadingEditUser } from '../../slices/usersSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function EditUser() {

  const { id } = useParams()

  const user = useSelector(state => state.users.user)
  const roleOptions = useSelector(state => state.users.roleOptions)
  const loadingUser = useSelector(state => state.users.loadingUser)
  const loadingEditUser = useSelector(state => state.users.loadingEditUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({ 
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
      
      setTimeout(async ()=> {
        const res = await getUser(id)
        dispatch(setUser(res))
        setFormValues(res)
        dispatch(setLoadingUser(false))
      }, 1000)
    }
  
    const fetchRoleOptions = async () => {
      const res = await getRoleOptions()
      dispatch(setRoleOptions(res))
    }

    fetchUser()
    fetchRoleOptions()
  }, [dispatch, id])

  const setFormValues = (user) => {
    setValue("name", user?.name || '')
    setValue("identification", user?.identification || '')
    setValue("address", user?.address || '')
    setValue("role", user?.role ? user.role.value : '')
    setValue("phone", user?.phone || '')
    setValue("email", user?.email || '')
  }

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const onSubmit = (event) => {
    dispatch(setLoadingEditUser(true))

    console.log('submit');
    console.log('event ', event);
    console.log('user ', user);

    const body = {
      ...event,
      identification: parseInt(event.identification, 10),
      phone: parseInt(event.phone, 10)
    }

    setTimeout(() => {
      const editUser = async () => {
        const res = await putUser(id, body)

        dispatch(setLoadingEditUser(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/usuarios')
          }, 2000)
        }
      }

      editUser()
    }, 2000)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Editar Usuario">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Editar Usuario
        </Typography>

        {loadingUser ?
          <Loader /> :
          <FormCard>   
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='name'
                      label='Nombre y Apellido'
                      placeholder='Ingrese nombre y apellido'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input
                      name='identification'
                      label='Cédula de Identidad'
                      placeholder='Ingrese la cédula de identidad'
                      type='number'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.identification}
                    />
                  </Grid>
                </Grid>
                
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='address'
                      label='Dirección'
                      placeholder='Ingrese la dirección'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='role'
                      label='Rol'
                      placeholder='Seleccione un rol'
                      isSelect
                      selectOptions={roleOptions}
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.role}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='phone'
                      label='Teléfono'
                      placeholder='Ingrese el número de teléfono'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='email'
                      label='Correo electrónico'
                      placeholder='Ingrese el correo electrónico'
                      type='email'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato no es correcto"
                        }
                      }}
                      error={errors.email}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  spacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mt={8}
                >
                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                    <OutlinedButton 
                      isRouterLink 
                      path="/dashboard/usuarios"
                      defaultPadding
                      defaultMarginRight={smUp}
                    >
                      Volver
                    </OutlinedButton>
                  </GridStyle>

                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                    <ContainedButton type='submit' defaultPadding loading={loadingEditUser}>
                      Actualizar
                    </ContainedButton>
                  </GridStyle>
                </Grid>

              </Grid>
            </form>
          </FormCard>
        }

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { EditUser };
