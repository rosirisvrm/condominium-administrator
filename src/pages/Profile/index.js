import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { AvatarUploader } from '../../components/AvatarUploader';
// import { Loader } from '../../components/Loader';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { /* getUser, */ putUser } from '../../services/users';
// slice
import { /* setUser, setLoadingUser, */ setLoadingEditUser } from '../../slices/usersSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function Profile() {

  const auth = useSelector(state => state.auth.user)
  // const loadingAuth = useSelector(state => state.auth.loadingAuth)
  const loadingEditUser = useSelector(state => state.users.loadingEditUser)

  const dispatch = useDispatch()

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

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [image, setImage] = React.useState('')
  const [preview, setPreview] = React.useState('')

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const readImage = () => {
    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result)
    }

    reader.readAsDataURL(image)
  }

  useEffect(() => {
    // const fetchProfile = async () => {
    //   dispatch(setLoadingProfile(true))
      
    //   setTimeout(async ()=> {
    //     const res = await getProfile()
    //     dispatch(setProfile(res))
    //     setFormValues()
    //     dispatch(setLoadingProfile(false))
    //   }, 1000)
    // }

    // fetchProfile()

    setFormValues()

    if(image){
      readImage()
    }
  }, [dispatch, image, readImage])

  const setFormValues = () => {
    setValue("name", auth?.name || '')
    setValue("identification", auth?.identification || '')
    setValue("address", auth?.address || '')
    setValue("role", auth?.role ? auth.role.label : '')
    setValue("phone", auth?.phone || '')
    setValue("email", auth?.email || '')
  }

  const onSubmit = (event) => {
    dispatch(setLoadingEditUser(true))

    console.log('submit');
    console.log('event ', event);
    console.log('auth ', auth);

    const body = {
      ...event,
      phone: parseInt(event.phone, 10)
    }

    setTimeout(() => {
      const editProfile = async () => {
        const res = await putUser(auth?.id, body)

        dispatch(setLoadingEditUser(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);
      }

      editProfile()
    }, 2000)
  }

  return (
    <Page title='Perfil'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Perfil
        </Typography>

        {/* {(loadingUser) ?
          <Loader /> : */}
          <FormCard>   
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>

              <Grid container item xs={12} justifyContent='center' alignItems='center' mb={3}>
                <AvatarUploader 
                  url={preview || auth?.photoURL}
                  name={auth?.name || 'Profile'}
                  tooltipText="Seleccionar imagen"
                  setImage={setImage}
                />
              </Grid>

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
                <GridStyle container item xs={12} sm={3} md={4} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                  <ContainedButton type='submit' defaultPadding defaultMarginRight={smUp}>
                    Cambiar contraseña
                  </ContainedButton>
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
        {/* } */}

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { Profile };
