import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
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
import { setUser, setLoadingUser } from '../../actions';
import { getUser } from '../../services';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function UserDetail() {

  const { id } = useParams()
  
  const user = useSelector(state => state.user)
  const loadingUser = useSelector(state => state.loadingUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoadingUser(true))
      
      setTimeout(async () => {
        const resUser = await getUser(id)
        dispatch(setUser(resUser))
        dispatch(setLoadingUser(false))
      }, 1000)
    }

    fetchUser()
  }, [dispatch, id])

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
                      label='Nombre y Apellido'
                      inputValue={user?.name || ''}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Cédula de Identidad'
                      inputValue={user?.identification || ''}
                      disabled
                    />
                  </Grid>
                </Grid>
                
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Dirección'
                      inputValue={user?.address || ''}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Rol'
                      inputValue={user?.role?.label || ''}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Teléfono'
                      inputValue={user?.phone || ''}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input 
                      label='Correo electrónico'
                      inputValue={user?.email || ''}
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
        }

      </Container>
    </Page>
  );
}

export { UserDetail };
