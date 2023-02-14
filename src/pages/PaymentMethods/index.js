import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
// @mui
import { 
    Container, 
    Typography, 
    Grid,
    Button,
    Stack
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
// import { Modal } from '../../components/Modal';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { 
    getPaymentMethodOptions,
} from '../../services/customSettings';
// slices
import { 
    setPaymentMethodOptions,
    setLoadingPaymentMethods,
} from '../../slices/customSettings';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function PaymentMethods() {

  const paymentMethods = useSelector(state => state.customSettings.paymentMethodOptions)
  const loadingPaymentMethods = useSelector(state => state.customSettings.loadingPaymentMethods)

  const dispatch = useDispatch()
  const smUp = useResponsive('up', 'sm');
  const theme = useTheme()

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    watch 
} = useForm({
    defaultValues: {
      title: '',
      text: '',
      date: new Date(),
      hour: new Date(),
    }
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      dispatch(setLoadingPaymentMethods(true))
      
      setTimeout(async ()=> {
        const res = getPaymentMethodOptions()
        dispatch(setPaymentMethodOptions(res))
        dispatch(setLoadingPaymentMethods(false))
      }, 1000)
    }

    fetchPaymentMethods()
  }, [dispatch])

  // const onSubmit = (event) => {
  //   if(!id){
  //       dispatch(setLoadingCreateNotification(true))
  //   }else{
  //       dispatch(setLoadingEditNotification(true))
  //   }

  //   console.log('event ', event);

  //   const body = {
  //    ...event,
  //   }

  //   setTimeout(() => {
  //     const submitNotification = async () => {
  //       let res = null;
  
  //       if(!id){
  //           res = await postNotification(body)
  //           dispatch(setLoadingCreateNotification(false))
  //       }else{
  //           res = await putNotification(id, body)
  //           dispatch(setLoadingEditNotification(false))
  //       }

  //       setColor(res ? 'success' : 'error')
  //       setOpen(true);
  //     }

  //     submitNotification()
  //   }, 2000)
  // }

  // const handleClickOpen = () => {
  //   setDialogOpen(true);
  // };

  // const handleClose = () => {
  //   setDialogOpen(false);
  // };

  // const handleModalSave = () => {    
  //   handleClose()
  // }

  const getIcon = (type) => {
    if(type.value === 0){
      return "heroicons:arrows-right-left-20-solid";
    }

    if(type.value === 1){
      return 'bi:phone'
    }

    return 'tabler:cash'
  }

  const getNumber = (item) => {
    if(item.type.value === 0){
      return item.bankAcount;
    }

    if(item.type.value === 1){
      return item.phone;
    }

    return '';
  }

  return (
    <Page title='Métodos de Pago'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Métodos de Pago
        </Typography>

        {loadingPaymentMethods ?
          <Loader /> :
          <FormCard>   
            <Grid container spacing={2}>
              <Grid
                container
                item
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Agregar
                  </Button>
                </GridStyle>
              </Grid>

              {paymentMethods && 
                paymentMethods?.length && 
                  paymentMethods.length > 0 &&
                    paymentMethods.map((item) => (
                      <Grid item xs={12} container>
                        <Stack direction="row" alignItems="center" justifyContent="flex-start">
                          <Iconify 
                            icon={getIcon(item.type)} 
                            width={24} 
                            height={24} 
                            sx={{ 
                              color: theme.palette.grey[600],
                              mr: 2,
                            }} 
                          />

                          <Typography variant='subtitle1'>
                            {item?.type?.label}
                          </Typography>
                        </Stack>
                        
                        <Grid item xs={12} container>
                          <Grid item xs={12} md={3} container>
                            <Typography variant='caption'>{item?.bank?.label || ''}</Typography>
                          </Grid>

                          <Grid item xs={12} md={3} container>
                            <Typography variant='caption'>
                              {getNumber(item)}
                            </Typography>
                          </Grid>

                        </Grid>
                      </Grid>
              ))}

            </Grid>
          </FormCard>
        }

        {/* <Modal 
            open={dialogOpen}
            handleClose={handleClose}
            handleSave={handleModalSave}
            title='Programar Notificación'
            closeButtonText='Cancelar'
            saveButtonText={'Programar'}
            disabledSaveButton={(!watch('date') || !watch('hour'))}
            maxWidth='xs'
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        Seleccione la fecha y hora para enviar la notificación a los usuarios.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name='date'
                        label='Fecha'
                        placeholder='Seleccione la fecha'
                        isDate
                        control={control}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name='hour'
                        label='Hora'
                        placeholder='Seleccione la hora'
                        isTime
                        control={control}
                    />
                </Grid>
            </Grid>
          </form>
        </Modal> */}

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { PaymentMethods };
