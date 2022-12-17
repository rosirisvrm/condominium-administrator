import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
//
import useResponsive from '../../hooks/useResponsive';
import { postEmployee } from '../../services/employees';
import { setLoadingCreateEmployee } from '../../slices/employees';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateEmployee() {

  // const roleOptions = useSelector(state => state.users.roleOptions)
  const loadingCreateEmployee = useSelector(state => state.employees.loadingCreateEmployee)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      identification: '',
      address: '',
      position: '',
      phone: '',
      email: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      file: '',
    }
  });

//   useEffect(() => {
//     const fetchRoleOptions = async () => {
//       const res = await getRoleOptions()
//       dispatch(setRoleOptions(res))
//     }

//     fetchRoleOptions()
//   }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    dispatch(setLoadingCreateEmployee(true))

    console.log('submit');
    console.log('event ', event);

    const body = {
     ...event,
     identification: parseInt(event.identification, 10),
     phone: parseInt(event.phone, 10)
    }

    setTimeout(() => {
      const createEmployee = async () => {
        const res = await postEmployee(body)
  
        dispatch(setLoadingCreateEmployee(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/empleados')
          }, 2000)
        }
      }

      createEmployee()
    }, 2000)
  }

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Crear Empleado">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Empleado
        </Typography>

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
                    label='Documento de Identidad'
                    placeholder='Ingrese el documento de identidad'
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
                        name='position'
                        label='Cargo'
                        placeholder='Ingrese el cargo a desempeñar'
                        type='text'
                        control={control}
                        validations={{
                            required: {
                                value: true,
                                message: 'El campo es requerido'
                            }
                        }}
                        error={errors.position}
                    />
                </Grid>
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

              <Grid item xs={12}>
                  <Input
                    name='description'
                    label='Descripción de cargo'
                    placeholder='Ingrese la descripción'
                    multiline
                    type='text'
                    control={control}
                    validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                    }}
                    error={errors.description}
                  />
              </Grid>

              <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='startDate'
                      label='Fecha de inicio de contrato'
                      placeholder='Selecciona una fecha'
                      isDate
                      control={control}
                      error={errors.startDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='endDate'
                      label='Fecha de fin de contrato'
                      placeholder='Selecciona una fecha'
                      isDate
                      control={control}
                      error={errors.endDate}
                    />
                  </Grid>
              </Grid>

              <Grid item xs={12} container direction="column">
                <Input
                    name='file'
                    label='Adjuntar Archivo'
                    isFileUpload
                    accept='.pdf, .doc, .docx, image/*, .xlsx'
                    control={control}
                    validations={{
                        required: {
                        value: true,
                        message: 'El campo es requerido'
                        },
                    }}
                    error={errors.file}
                    callback={handleFileUpload}
                    helperText={fileName}
                />
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
                    path="/dashboard/empleados"
                    defaultPadding
                    defaultMarginRight={smUp}
                  >
                    Volver
                  </OutlinedButton>
                </GridStyle>

                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <ContainedButton type='submit' defaultPadding loading={loadingCreateEmployee}>
                    Agregar
                  </ContainedButton>
                </GridStyle>
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

export { CreateEmployee };
