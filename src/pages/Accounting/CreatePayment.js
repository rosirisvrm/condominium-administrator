import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, InputAdornment } from '@mui/material';
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
import { getReceiverTypeOptions, getReceiverOptions, postPayment } from '../../services/accounting';
import { getPaymentMethodOptions } from '../../services/customSettings';
import { setReceiverTypeOptions, setReceiverOptions, setLoadingCreatePayment } from '../../slices/accountingSlice';
import { setPaymentMethodOptions } from '../../slices/customSettings';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreatePayment() {

  const user = useSelector(state => state.auth.user)
  const receiverTypeOptions = useSelector(state => state.accounting.receiverTypeOptions)
  const receiverOptions = useSelector(state => state.accounting.receiverOptions)
  const paymentMethodOptions = useSelector(state => state.customSettings.paymentMethodOptions)
  const loadingCreatePayment = useSelector(state => state.accounting.loadingCreatePayment)

  const coin = useSelector(state => state.customSettings.coin)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm({
    defaultValues: {
      subject: '',
      receiverType: '',
      receiver: '',
      paymentMethod: '',
      amount: '',
      reference: '',
      date: new Date(),
      description: '',
      file: '',
    }
  });

  useEffect(() => {
    // If admin
    if(user.role.value === 2){
      const fetchReceiverTypeOptions = async () => {
        const res = await getReceiverTypeOptions()
        dispatch(setReceiverTypeOptions(res))
      }
  
      fetchReceiverTypeOptions()
  
      dispatch(setReceiverOptions([]))

    }else{
      const fetchPaymentMethodOptions = async () => {
        const res = await getPaymentMethodOptions()
        dispatch(setPaymentMethodOptions(res))
      }
  
      fetchPaymentMethodOptions()
    }
  }, [dispatch, user])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    dispatch(setLoadingCreatePayment(true))

    console.log('submit');
    console.log('event ', event);

    const body = {
     ...event,
     file,
    }

    setTimeout(() => {
      const createPayment = async () => {
        const res = await postPayment(body)
  
        dispatch(setLoadingCreatePayment(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/contabilidad/pagos')
          }, 2000)
        }
      }

      createPayment()
    }, 2000)
  }

  const handlerSelectReceiverType = (event) => {
    setValue("receiver", '')
    setValue("paymentMethod", '')

    const fetchReceiverOptions = async () => {
      const res = await getReceiverOptions(event)
      dispatch(setReceiverOptions(res))
    }

    fetchReceiverOptions()
  }

  const handlerSelectReceiver = (event) => {
    const selected = receiverOptions.find(item => parseInt(item.value, 10) === parseInt(event, 10))

    setValue("paymentMethod", selected?.paymentMethod || '')
    clearErrors('paymentMethod');
  }

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Enviar Pago">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Enviar Pago
        </Typography>

        <FormCard>   
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              {/* If admin */}
              {(user.role.value === 2) && <>
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='subject'
                      label='Asunto'
                      placeholder='Ingrese el asunto'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='receiverType'
                      label='Tipo de Destinatario (Empleado/Proveedor)'
                      placeholder='Seleccione el tipo de destinatario'
                      isSelect
                      selectOptions={receiverTypeOptions}
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.receiverType}
                      callback={handlerSelectReceiverType}
                    />
                  </Grid>
                </Grid>
                
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='receiver'
                      label='Destinatario'
                      placeholder='Seleccione el destinatario'
                      isSelect
                      selectOptions={receiverOptions}
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.receiver}
                      disabled={receiverOptions.length === 0}
                      callback={handlerSelectReceiver}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='paymentMethod'
                      label='Método de Pago'
                      placeholder='Método de pago del destinatario'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.paymentMethod}
                      disabled
                    />
                  </Grid>
                </Grid>
              </>}

              {/* If not admin */}
              {(user.role.value !== 2) &&
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='subject'
                      label='Asunto'
                      placeholder='Ingrese el asunto'
                      type='text'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.subject}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='paymentMethod'
                      label='Método de Pago'
                      placeholder='Seleccione el método de pago'
                      isSelect
                      selectOptions={paymentMethodOptions}
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.paymentMethod}
                    />
                  </Grid>
                </Grid>
              }

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='amount'
                    label='Monto'
                    placeholder='Ingrese el monto'
                    type='number'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    }}
                    error={errors.amount}
                    startAdornment={
                      <InputAdornment position="start" style={{ marginRight: 10 }}>
                        <span>
                          <strong>{coin?.symbol || ''}</strong>
                        </span>
                      </InputAdornment>
                    }
                    step="0.01"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='reference'
                    label='Referencia'
                    placeholder='Ingrese el número de referencia'
                    type='number'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
                    error={errors.reference}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='date'
                    label='Fecha de la Transacción'
                    placeholder='Selecciona una fecha'
                    isDate
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
                    error={errors.date}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='description'
                    label='Descripción'
                    placeholder='Ingrese una descripción'
                    type='text'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
                    error={errors.description}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} container direction="column">
                <Input
                  name='file'
                  label='Comprobante'
                  isFileUpload
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
                    path="/dashboard/contabilidad/pagos"
                    defaultPadding
                    defaultMarginRight={smUp}
                  >
                    Volver
                  </OutlinedButton>
                </GridStyle>

                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <ContainedButton type='submit' defaultPadding loading={loadingCreatePayment}>
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

export { CreatePayment };
