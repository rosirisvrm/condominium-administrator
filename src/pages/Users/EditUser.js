import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
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
import { getUser, getRoleOptions } from '../../services/users';
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

  useEffect(() => {

    const fetchUser = async () => {
      dispatch(setLoadingUser(true))
      
      setTimeout(async ()=> {
        const resUser = await getUser(id)
        dispatch(setUser(resUser))
        setFormValues(resUser)
        dispatch(setLoadingUser(false))
      }, 1000)
    }
  
    const fetchRoleOptions = async () => {
      const resRoleOptions = await getRoleOptions()
      dispatch(setRoleOptions(resRoleOptions))
    }

    fetchUser()
    fetchRoleOptions()
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [name, setName] = React.useState('')
  const [identification, setIdentification] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [role, setRole] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')

  const setFormValues = (user) => {
    setName(user?.name || '')
    setIdentification(user?.identification || '')
    setAddress(user?.address || '')
    setRole(user?.role ? user.role.value : '')
    setPhone(user?.phone || '')
    setEmail(user?.email || '')
  }

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoadingEditUser(true))

    setTimeout(() => {
      console.log('submit');
      console.log('form values:', name, identification, address, role, phone, email);
      console.log('user: ', user);
      
      dispatch(setLoadingEditUser(false))
      setColor('success')
      setOpen(true);

      setTimeout(() => {
        navigate('/dashboard/usuarios')
      }, 2000)
    }, 1000)
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
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Nombre y Apellido'
                      placeholder='Ingrese nombre y apellido'
                      inputValue={name}
                      setInputValue={setName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Cédula de Identidad'
                      placeholder='Ingrese la cédula de identidad '
                      inputValue={identification}
                      setInputValue={setIdentification}
                    />
                  </Grid>
                </Grid>
                
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Dirección'
                      placeholder='Ingrese la dirección'
                      inputValue={address}
                      setInputValue={setAddress}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Rol'
                      placeholder='Seleccione un rol'
                      // inputValue={role === '' ? user.role.value : role}
                      inputValue={role}
                      setInputValue={setRole}
                      isSelect
                      selectOptions={roleOptions}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Teléfono'
                      placeholder='Ingrese el número de teléfono'
                      inputValue={phone}
                      setInputValue={setPhone}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
