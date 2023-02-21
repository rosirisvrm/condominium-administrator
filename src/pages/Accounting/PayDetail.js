import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, InputAdornment, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
// components
import { Loader } from '../../components/Loader';
import { DownloadButton } from '../../components/DownloadButton';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { putPayment, getPayment, getStatusOptions } from '../../services/accounting';
// slices
import { 
  setLoadingEditPayment, 
  setLoadingPayment, 
  setPayment, 
  setStatusOptions,
  setLoadingDownloadPayment,
} from '../../slices/accountingSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

const LabelStyle = styled('span')(() => ({
  marginBottom: 8,
}));

const BoxStyle = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  flexDirection: 'column'
}));

// ----------------------------------------------------------------------

function PayDetail() {

  const { id } = useParams()

  const user = useSelector(state => state.auth.user)
  const payment = useSelector(state => state.accounting.payment)
  const loadingPayment = useSelector(state => state.accounting.loadingPayment)
  const loadingEditPayment = useSelector(state => state.accounting.loadingEditPayment)
  const loadingDownloadPayment = useSelector(state => state.accounting.loadingDownloadPayment)
  const statusOptions = useSelector(state => state.accounting.statusOptions)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      subject: '',
      paymentMethod: '',
      amount: '',
      reference: '',
      date: new Date(),
      description: '',
      file: '',
      rate: '',
      name: '',
      address: ''
    }
  });

  useEffect(() => {
    // If admin
    if(user.role.value === 2){
      const fetchStatusOptions = async () => {
          const res = await getStatusOptions()
          dispatch(setStatusOptions(res))
      }
      
      fetchStatusOptions()
    }

    const fetchPayment = async () => {
      dispatch(setLoadingPayment(true))
      
      setTimeout(async ()=> {
        const res = await getPayment(id)
        dispatch(setPayment(res))
        setFormValues(res)
        dispatch(setLoadingPayment(false))
      }, 1000)
    }

    fetchPayment()
  }, [dispatch, user])

  const setFormValues = (payment) => {
    setValue("subject", payment?.subject || '')
    setValue("paymentMethod", payment?.paymentMethod ? payment.paymentMethod?.label : '')
    setValue("amount", payment?.amount || '')
    setValue("reference", payment?.reference || '')
    setValue("date", payment?.date || '')
    setValue("description", payment?.description || '')
    if(user.role.value === 2){
      setValue("status", payment?.status ?  payment.status?.value : '')
    }else{
      setValue("status", payment?.status ?  payment.status?.label : '')
    }
    setValue("rate", payment?.rate || '')
    setValue("name", payment?.user ? payment.user?.name : '')
    setValue("address", payment?.user ? payment.user?.address : '')

    // TO DO: Set file
    setValue("file", payment?.file || '')
    // setFile(payment?.file || '')
    setFileName(payment?.file || '')
  }

  const onSubmit = (event) => {
    dispatch(setLoadingEditPayment(true))

    console.log('event ', event);
    console.log('payment ', payment);

    const body = {
     ...event,
     file,
    }

    setTimeout(() => {
      const editPayment = async () => {
        const res = await putPayment(body)
  
        dispatch(setLoadingEditPayment(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/contabilidad/pagos')
          }, 2000)
        }
      }

      editPayment()
    }, 2000)
  }

  const downloadFile = () => {
    dispatch(setLoadingDownloadPayment(true))

    setTimeout(() => {
      dispatch(setLoadingDownloadPayment(false))
    }, 2000)
  };

  return (
    <Page title="Detalle de Pago">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Pago
        </Typography>

        {loadingPayment ?
          <Loader /> :
          <FormCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>

                {/* If admin */}
                {(user.role.value === 2) &&
                  <Grid container item spacing={spacing}>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name='name'
                        label='Nombre'
                        type='text'
                        control={control}
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Input
                        name='address'
                        label='Dirección'
                        type='text'
                        control={control}
                        disabled
                      />
                    </Grid>
                  </Grid>
                }

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='subject'
                      label='Asunto'
                      type='text'
                      control={control}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='paymentMethod'
                      label='Método de Pago'
                      type='text'
                      control={control}
                      disabled
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='amount'
                      label='Monto'
                      type='number'
                      disabled
                      control={control}
                      startAdornment={
                        <InputAdornment position="start" style={{ marginRight: 10 }}>
                          <span>
                            <strong>$</strong>
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
                      disabled
                      type='number'
                      control={control}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                  <Input
                      name='date'
                      label='Fecha de la Transacción'
                      isDate
                      control={control}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='description'
                      label='Descripción'
                      disabled
                      type='text'
                      control={control}
                    />
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='rate'
                      label='Tasa del Dólar'
                      type='number'
                      control={control}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} container direction='column'>
                    <LabelStyle>
                      Comprobante
                    </LabelStyle>
                    {fileName && 
                      <BoxStyle>
                        <DownloadButton 
                          onClick={downloadFile} 
                          text='Descargar' 
                          loading={loadingDownloadPayment}
                        />
                      </BoxStyle>
                    } 
                  </Grid>
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    {/* If admin */}
                    {user.role.value === 2 ?
                      <Input
                        name='status'
                        label='Status'
                        isSelect
                        selectOptions={statusOptions}
                        control={control}
                      />
                    :
                      <Input
                        name='status'
                        label='Status'
                        type='text'
                        disabled
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
                      path="/dashboard/contabilidad/pagos"
                      defaultPadding
                      defaultMarginRight={smUp}
                    >
                      Volver
                    </OutlinedButton>
                  </GridStyle>

                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                    <ContainedButton type='submit' defaultPadding loading={loadingEditPayment}>
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

export { PayDetail };
