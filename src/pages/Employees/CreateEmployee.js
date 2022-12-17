import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getEmployee, postEmployee, putEmployee } from '../../services/employees';
import { setLoadingCreateEmployee, setLoadingEmployee, setEmployee, setLoadingEditEmployee } from '../../slices/employees';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateEmployee() {

  const { id } = useParams()

  const employee = useSelector(state => state.employees.employee)
  const loadingEmployee = useSelector(state => state.employees.loadingEmployee)
  const loadingCreateEmployee = useSelector(state => state.employees.loadingCreateEmployee)
  const loadingEditEmployee = useSelector(state => state.employees.loadingEditEmployee)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
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

  useEffect(() => {
    if(id){
        const fetchEmployee = async () => {
            dispatch(setLoadingEmployee(true))
            
            setTimeout(async ()=> {
                const res = await getEmployee(id)
                dispatch(setEmployee(res))
                setFormValues(res)
                dispatch(setLoadingEmployee(false))
            }, 1000)
        }

        fetchEmployee()
    }
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    if(!id){
        dispatch(setLoadingCreateEmployee(true))
    }else{
        dispatch(setLoadingEditEmployee(true))
    }

    console.log('submit');
    console.log('event ', event);
    console.log('employee ', employee);

    const body = {
     ...event,
     identification: parseInt(event.identification, 10),
     phone: parseInt(event.phone, 10),
     file
    }

    setTimeout(() => {
      const submitEmployee = async () => {
        let res = null;
  
        if(!id){
            res = await postEmployee(body)
            dispatch(setLoadingCreateEmployee(false))
        }else{
            res = await putEmployee(id, body)
            dispatch(setLoadingEditEmployee(false))
        }

        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/empleados')
          }, 2000)
        }
      }

      submitEmployee()
    }, 2000)
  }

  const setFormValues = (employee) => {
    setValue("name", employee?.name || '')
    setValue("identification", employee?.identification || '')
    setValue("address", employee?.address || '')
    setValue("position", employee?.position || '')
    setValue("phone", employee?.phone || '')
    setValue("email", employee?.email || '')
    setValue("description", employee?.description || '')
    setValue("startDate", employee?.startDate || '')
    setValue("endDate", employee?.endDate || '')
  }

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Empleado`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Empleado`}
        </Typography>

        {(id && loadingEmployee) ?
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
                    <ContainedButton type='submit' defaultPadding loading={!id ? loadingCreateEmployee : loadingEditEmployee}>
                        {!id ? 'Agregar' : 'Actualizar'}
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

export { CreateEmployee };
