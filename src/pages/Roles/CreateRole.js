import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
//
import useResponsive from '../../hooks/useResponsive';
import {
  getRoleStatusOptions,
  getPermissionsStatusOptions,
  getModuleStatusOptions,
  postRoleStatus,
} from '../../services/roles';
import {
  setRoleStatusOptions,
  setPermissionsStatusOptions,
  setModuleStatusOptions,
  setLoadingRolesList,
} from '../../slices/roles';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`,
}));

// ----------------------------------------------------------------------

function CreateRole() {
  const roleOptions = useSelector((state) => state.roles.roleStatusOptions);
  const permissionsOptions = useSelector((state) => state.roles.permissionsStatusOptions);
  const moduleOptions = useSelector((state) => state.roles.moduleStatusOptions);
  const loadingCreateUser = useSelector((state) => state.roles.loadingRolesList);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      status: '',
      description: '',
      permission: '',
      module: '',
    },
  });

  useEffect(() => {
    const fetchRoleOptions = async () => {
      const res = await getRoleStatusOptions();
      dispatch(setRoleStatusOptions(res));
    };

    fetchRoleOptions();

    const fetchPermissionsOptions = async () => {
      const res = await getPermissionsStatusOptions();
      dispatch(setPermissionsStatusOptions(res));
    };

    fetchPermissionsOptions();

    const fetchModuleOptions = async () => {
      const res = await getModuleStatusOptions();
      dispatch(setModuleStatusOptions(res));
    };

    fetchModuleOptions();
  }, [dispatch]);

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('');

  const [permissions, setOptions] = React.useState([]);
  const [preSelectionedPermissions, setPreSelectionedPermissions] = React.useState('');
  const [preSelectionedModule, setPreSelectionedModule] = React.useState('');

  const onSubmit = (event) => {
    dispatch(setLoadingRolesList(true));

    console.log('submit');
    console.log('event ', event);

    const body = {
      name: event.name,
      description: event.description,
      status: event.status,
      permissions,
    };

    setTimeout(() => {
      const createUserRequest = async () => {
        const res = await postRoleStatus(body);

        dispatch(setLoadingRolesList(false));
        setColor(res ? 'success' : 'error');
        setOpen(true);

        if (res) {
          setTimeout(() => {
            navigate('/dashboard/roles');
          }, 2000);
        }
      };

      createUserRequest();
    }, 2000);
  };

  let spacing = 2;
  if (smUp) spacing = 6;
  if (mdUp) spacing = 12;

  const handlerSelectPermissions = (event) => {
    const selected = permissionsOptions.find((item) => parseInt(item.value, 10) === parseInt(event, 10));
    setPreSelectionedPermissions(selected);
  };

  const handlerSelectModule = (event) => {
    const selected = moduleOptions.find((item) => parseInt(item.value, 10) === parseInt(event, 10));
    setPreSelectionedModule(selected);
  };

  const addOption = () => {
    const newOptions = [
      ...permissions,
      {
        permission: preSelectionedPermissions,
        module: preSelectionedModule,
      },
    ];

    setOptions(newOptions);
    console.log(newOptions);
    setValue('option', '');
  };

  const deleteOption = (index) => {
    const newOptions = [...permissions];

    newOptions.splice(index, 1);

    setOptions(newOptions);
  };

  return (
    <Page title="Crear Rol">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Rol
        </Typography>

        <FormCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input
                    name="name"
                    label="Nombre"
                    placeholder="Ingrese el nombre del rol"
                    type="text"
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido',
                      },
                    }}
                    error={errors.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input
                    name="status"
                    label="Status"
                    placeholder="Seleccione el status del rol"
                    isSelect
                    selectOptions={roleOptions}
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido',
                      },
                    }}
                    error={errors.status}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={12}>
                  <Input
                    name="description"
                    label="Descripción"
                    placeholder="Ingrese la descripción del rol"
                    type="text"
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido',
                      },
                    }}
                    error={errors.description}
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                Añadir permisos
              </Typography>

              <Grid container item spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Input
                    name="permission"
                    label="Permiso"
                    placeholder="Seleccione el permiso"
                    isSelect
                    selectOptions={permissionsOptions}
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido',
                      },
                    }}
                    error={errors.permission}
                    callback={handlerSelectPermissions}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Input
                    name="module"
                    label="Módulo"
                    placeholder="Seleccione el módulo"
                    isSelect
                    selectOptions={moduleOptions}
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido',
                      },
                    }}
                    error={errors.module}
                    callback={handlerSelectModule}
                  />
                </Grid>

                <Grid item xs={12} sm={4} container direction="row" justifyContent="start" alignItems="flex-end">
                  <OutlinedButton
                    size="medium"
                    onClick={addOption}
                    disabled={((watch('permission') === '') || (watch('module') === ''))}
                  >
                    Añadir permiso
                  </OutlinedButton>
                </Grid>
              </Grid>

              {permissions.length > 0 && (
                <>
                  <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                    Permisos añadidos
                  </Typography>

                  {permissions.map((option, index) => (
                    <Grid container item spacing={3} key={index}>
                      <Grid item xs={6} sm={3}>
                        <Typography variant="span">{option.permission.label}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={1}>
                        <Typography variant="span">{option.module.label}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={5.7} container direction="row" justifyContent="center">
                        <IconButton onClick={() => deleteOption(index)} sx={{ p: 0 }}>
                          <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                        </IconButton>
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

                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <ContainedButton type="submit" defaultPadding loading={loadingCreateUser}>
                    Agregar
                  </ContainedButton>
                </GridStyle>
              </Grid>
            </Grid>
          </form>
        </FormCard>

        <CustomSnackbar open={open} onClose={() => setOpen(false)} color={color} />
      </Container>
    </Page>
  );
}

export { CreateRole };
