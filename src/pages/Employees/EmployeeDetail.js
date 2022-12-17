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
import { Loader } from '../../components/Loader';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getEmployee } from '../../services/employees';
// slices
import { setLoadingEmployee, setEmployee } from '../../slices/employees';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function EmployeeDetail() {

  const { id } = useParams()

  const employee = useSelector(state => state.employees.employee)
  const loadingEmployee = useSelector(state => state.employees.loadingEmployee)

  const dispatch = useDispatch()

  const { control, handleSubmit, setValue, watch } = useForm({
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
      paymentMethodType: '',
      bank: '',
      identificationType: '',
      paymentMethodIdentification: '',
      bankAcount: '',
      paymentMethodPhone: '',
    }
  });

  useEffect(() => {
    if(id){
        const fetchEmployee = async () => {
            dispatch(setLoadingEmployee(true))
            
            setTimeout(async ()=> {
                const res = await getEmployee(id)
                dispatch(setEmployee(res))
                setFormValues()
                dispatch(setLoadingEmployee(false))
            }, 1000)
        }

        fetchEmployee()
    }
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const setFormValues = () => {
    setValue("name", employee?.name || '')
    setValue("identification", employee?.identification || '')
    setValue("address", employee?.address || '')
    setValue("position", employee?.position || '')
    setValue("phone", employee?.phone || '')
    setValue("email", employee?.email || '')
    setValue("description", employee?.description || '')
    setValue("startDate", employee?.startDate || '')
    setValue("endDate", employee?.endDate || '')

    setValue("paymentMethodType", employee?.paymentMethod ? employee.paymentMethod?.paymentMethodType?.label : '')
    setValue("bank", employee?.paymentMethod ? employee.paymentMethod?.bank?.label : '')
    setValue("identificationType", employee?.paymentMethod ? employee.paymentMethod?.identificationType?.label : '')
    setValue("paymentMethodIdentification", employee?.paymentMethod?.paymentMethodIdentification || '')
    setValue("bankAcount", employee?.paymentMethod?.bankAcount || '')
    setValue("paymentMethodPhone", employee?.paymentMethod?.paymentMethodPhone || '')

    // Falta setear file
    setFileName(employee?.file)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title='Detalle de Empleado'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Empleado
        </Typography>

        {(id && loadingEmployee) ?
            <Loader /> :
            <FormCard>   
                <form>
                    <Grid container spacing={2}>

                        <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                            Información personal
                        </Typography>

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
                                label='Documento de Identidad'
                                disabled
                                type='number'
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
                        </Grid>

                        <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                            Contrato
                        </Typography>

                        <Grid item xs={12}>
                            <Input
                                name='position'
                                label='Cargo'
                                disabled
                                type='text'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='description'
                                label='Descripción de cargo'
                                disabled
                                multiline
                                type='text'
                                control={control}
                            />
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='startDate'
                                    label='Fecha de inicio de contrato'
                                    disabled
                                    isDate
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='endDate'
                                    label='Fecha de fin de contrato'
                                    disabled
                                    isDate
                                    control={control}
                                />
                            </Grid>
                        </Grid>

                        {/* <Grid item xs={12} container direction="column">
                            
                        </Grid> */}

                        <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                            Método de Pago
                        </Typography>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='paymentMethodType'
                                    label='Tipo de Método de Pago'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='bank'
                                    label='Banco'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='identificationType'
                                    label='Tipo de Método de Pago'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                            <Input
                                name='paymentMethodIdentification'
                                label='Documento de Identidad'
                                disabled
                                type='number'
                                control={control}
                            />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                {/* Transferencia */}
                                {watch("paymentMethodType") === 0 &&
                                    <Input
                                        name='bankAcount'
                                        label='Número de Cuenta del Banco'
                                        disabled
                                        type='number'
                                        control={control}
                                    />
                                }
                                    
                                {/* Pago móvil */}
                                {watch("paymentMethodType") === 1 &&
                                    <Input
                                        name='paymentMethodPhone'
                                        label='Número de Teléfono'
                                        disabled
                                        type='text'
                                        control={control}
                                    />
                                }
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
                                path="/dashboard/empleados"
                                defaultPadding
                                defaultMarginRight={smUp}
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

export { EmployeeDetail };
