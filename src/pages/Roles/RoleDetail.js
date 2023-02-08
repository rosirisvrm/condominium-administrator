import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
import { getRole } from '../../services/roles';
import { setRole, setLoadingRole } from '../../slices/roles';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`,
}));

// ----------------------------------------------------------------------

function RoleDetail() {

  const { id } = useParams()

  const role = useSelector((state) => state.roles.role);
  const loadingRole = useSelector((state) => state.roles.loadingRole);

  const dispatch = useDispatch();

  const { control, setValue } = useForm({
    defaultValues: {
      name: '',
      status: '',
      description: '',
    },
  });

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingRole(true))
      
      setTimeout(async () => {
        const res = await getRole(id)
        dispatch(setRole(res))
        setFormValues()
        dispatch(setLoadingRole(false))
      }, 1000)
    }

    fetch()
  }, [dispatch, id])

  const setFormValues = () => {
    setValue("name", role?.name || '')
    setValue("description", role?.description || '')
    setValue("status", role?.status ? role.status?.label : '')
  }

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if (smUp) spacing = 6;
  if (mdUp) spacing = 12;

  return (
    <Page title="Detalle de Rol">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Rol
        </Typography>

        {loadingRole ?
            <Loader />
            :
            <FormCard>
                <form>
                    <Grid container spacing={2}>
                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                            <Input
                                name="name"
                                label="Nombre"
                                disabled
                                type="text"
                                control={control}
                            />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                            <Input
                                name="status"
                                label="Status"
                                disabled
                                control={control}
                            />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={12}>
                            <Input
                                name="description"
                                label="Descripción"
                                disabled
                                type="text"
                                control={control}
                            />
                            </Grid>
                        </Grid>

                        {role?.permissions?.length > 0 && (
                            <>
                                <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                                    Permisos
                                </Typography>

                                {role.permissions.map((option, index) => (
                                    <Grid container item spacing={3} key={index}>
                                        <Grid item xs={6} sm={3}>
                                            <Typography variant="span">{option.permission.label}</Typography>
                                        </Grid>
                                        <Grid item xs={6} sm={1}>
                                            <Typography variant="span">{option.module.label}</Typography>
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        )}                

                        <Grid container item spacing={2} direction="row" justifyContent="flex-end" alignItems="flex-end" mt={8}>
                            <GridStyle
                            container
                            item
                            xs={12}
                            sm={3}
                            md={2}
                            justifyContent={smUp ? 'flex-end' : 'center'}
                            mb={!smUp ? 2 : 0}
                            >
                            <OutlinedButton isRouterLink path="/dashboard/roles" defaultPadding defaultMarginRight={smUp}>
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

export { RoleDetail };
