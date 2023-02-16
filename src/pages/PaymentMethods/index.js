import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
// @mui
import { 
    Container, 
    Typography, 
    Grid,
    Button,
    Stack,
    IconButton,
    Tooltip
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { DeleteModal } from '../../components/DeleteModal';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { 
    getPaymentMethodOptions,
    getPaymentMethodTypeOptions, 
    getBankOptions, 
    getIdentificationTypeOptions 
} from '../../services/customSettings';
import { 
  getPaymentMethod,
  postPaymentMethod, 
  putPaymentMethod, 
  deletePaymentMethod 
} from '../../services/paymentMethods';
// slices
import { 
    setPaymentMethodOptions,
    setLoadingPaymentMethods,
    setPaymentMethodTypeOptions, 
    setBankOptions, 
    setIdentificationTypeOptions
} from '../../slices/customSettings';
import { 
  setPaymentMethod, 
  setLoadingPaymentMethod,
  setLoadingCreatePaymentMethod, 
  setLoadingEditPaymentMethod, 
  setLoadingDeletePaymentMethod
} from '../../slices/paymentMethods';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function PaymentMethods() {

  const paymentMethods = useSelector(state => state.customSettings.paymentMethodOptions)
  const loadingPaymentMethods = useSelector(state => state.customSettings.loadingPaymentMethods)
  const paymentMethod = useSelector(state => state.paymentMethods.paymentMethod)
  const loadingPaymentMethod = useSelector(state => state.paymentMethods.loadingPaymentMethod)
  const loadingCreatePaymentMethod = useSelector(state => state.paymentMethods.loadingCreatePaymentMethod)
  const loadingEditPaymentMethod = useSelector(state => state.paymentMethods.loadingEditPaymentMethod)
  const loadingDeletePaymentMethod = useSelector(state => state.paymentMethods.loadingDeletePaymentMethod)

  const paymentMethodTypeOptions = useSelector(state => state.customSettings.paymentMethodTypeOptions)
  const bankOptions = useSelector(state => state.customSettings.bankOptions)
  const identificationTypeOptions = useSelector(state => state.customSettings.identificationTypeOptions)

  const dispatch = useDispatch()
  const smUp = useResponsive('up', 'sm')
  const mdUp = useResponsive('up', 'md')
  const theme = useTheme()

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState('');
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(null);
  const [idDelete, setIdDelete] = React.useState(null);
  const [reload, setReload] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const { 
    control, 
    getValues,
    setValue, 
    watch, 
    reset
} = useForm({
    defaultValues: {
      paymentMethodType: '',
      bank: '',
      identificationType: '',
      paymentMethodIdentification: '',
      bankAcount: '',
      paymentMethodPhone: '',
      description: ''
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
  }, [dispatch, reload])

  useEffect(() => {
    const fetchPaymentMethodTypes = async () => {
      setTimeout(async ()=> {
          const res = await getPaymentMethodTypeOptions()
          dispatch(setPaymentMethodTypeOptions(res))
      }, 1000)
    }
    fetchPaymentMethodTypes()

    const fetchBankOptions = async () => {
        setTimeout(async ()=> {
            const res = await getBankOptions()
            dispatch(setBankOptions(res))
        }, 1000)
    }
    fetchBankOptions()

    const fetchIdentificationTypes = async () => {
        setTimeout(async ()=> {
            const res = await getIdentificationTypeOptions()
            dispatch(setIdentificationTypeOptions(res))
        }, 1000)
    }
    fetchIdentificationTypes()
  }, [open, dispatch])

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setIsEditing(false)
    setIdEdit(null)

    reset({
      paymentMethodType: '',
      bank: '',
      identificationType: '',
      paymentMethodIdentification: '',
      bankAcount: '',
      paymentMethodPhone: '',
      description: ''
    })
  };

  const handleModalSave = () => {
    onSubmit()
  }

  const setFormValues = () => {
    setValue('paymentMethodType', paymentMethod?.type ? paymentMethod.type?.value : '')
    setValue('bank', paymentMethod?.bank ? paymentMethod.bank?.value : '')
    setValue('identificationType', 
      paymentMethod?.identificationType ? paymentMethod?.identificationType.value : '')
    setValue('paymentMethodIdentification', paymentMethod?.identification || '')
    setValue('bankAcount', paymentMethod?.bankAcount || '')
    setValue('bankAcount', paymentMethod?.phone || '')
  }

  const edit = (id) => {
    handleClickOpen()
    setIsEditing(true)
    setIdEdit(id)

    dispatch(setLoadingPaymentMethod(true))

    setTimeout(async () => {
      const res = await getPaymentMethod(id)
      dispatch(setPaymentMethod(res))
      setFormValues()
      dispatch(setLoadingPaymentMethod(false))
    }, 2000)
  }

  const onSubmit = () => {
    if(!isEditing){
        dispatch(setLoadingCreatePaymentMethod(true))
    }else{
        dispatch(setLoadingEditPaymentMethod(true))
    }

    console.log('getValues', getValues());

    const body = {...getValues()}

    setTimeout(() => {
      const submit = async () => {
        let res = null;
  
        if(!isEditing){
            res = await postPaymentMethod(body)
            dispatch(setLoadingCreatePaymentMethod(false))
        }else{
            res = await putPaymentMethod(idEdit, body)
            dispatch(setLoadingEditPaymentMethod(false))
        }

        setColor(res ? 'success' : 'error')
        setOpen(true);
        setReload(prev => !prev)
        handleClose()
      }

      submit()
    }, 2000)
  }

  const deleteItem = () => {
    dispatch(setLoadingDeletePaymentMethod(true))
    
    setTimeout(async () => {
      const res = await deletePaymentMethod(idDelete)
      dispatch(setLoadingDeletePaymentMethod(false))

      setColor(res ? 'success' : 'error')
      setOpen(true);
      handleCloseDelete()
      setReload(prev => !prev)
    }, 2000)
  }

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

  const validateForm = () => {
    return (
      watch('paymentMethodType') === '' || 
      watch('bank') === '' ||
      watch('identificationType') === '' ||
      watch('paymentMethodIdentification') === '' ||
      (watch('paymentMethodType') === 0 && watch('bankAcount') === '') ||
      (watch('paymentMethodType') === 1 && watch('paymentMethodPhone') === '')
    );
  }

  const handleClickOpenDelete = (id) => {
    setIdDelete(id)
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

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
                  <Button 
                    variant="contained" 
                    startIcon={<Iconify icon="eva:plus-fill" />} 
                    onClick={handleClickOpen}>
                    Agregar
                  </Button>
                </GridStyle>
              </Grid>

              {paymentMethods && 
                paymentMethods?.length && 
                  paymentMethods.length > 0 &&
                    paymentMethods.map((item, index) => (
                      <Grid item xs={12} container key={index}>
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
                        
                        <Grid item xs={12} container sx={{ pl: 5 }}>
                          {(item.type.value !== 2) ?
                            <>
                              <Grid item xs={12} md={3} container>
                                <Typography variant='body2'>
                                  {item?.bank?.label || ''}
                                </Typography>
                              </Grid>

                              <Grid item xs={12} md={3} container>
                                <Typography variant='body2'>
                                  {getNumber(item)}
                                </Typography>
                              </Grid>

                              <Grid item xs={12} md={3} container>
                                <Typography variant='body2'>
                                  {`${item?.identificationType?.label || ''} ${item?.identification || ''}`}
                                </Typography>
                              </Grid>
                            </> : 
                            <Grid item xs={12} md={9} container>
                              <Typography variant='body2'>
                                {item?.description || ''}
                              </Typography>
                            </Grid>
                          }
                      
                          <Grid item xs={12} md={3} container direction='row' alignItems='center' justifyContent='flex-end'>
                            <Tooltip title="Editar">
                              <IconButton onClick={() => edit(item?.id)}>
                                <Iconify icon="eva:edit-fill" width={24} height={24} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Eliminar">
                              <IconButton onClick={() => handleClickOpenDelete(item?.id)}>
                                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
              ))}
            </Grid>
          </FormCard>
        }

        <Modal 
          open={dialogOpen}
          handleClose={handleClose}
          handleSave={handleModalSave}
          title='Agregar Método dePago'
          closeButtonText='Cancelar'
          saveButtonText={!isEditing ? 'Agregar' : 'Actualizar'}
          loadingSave={!isEditing ? loadingCreatePaymentMethod : loadingEditPaymentMethod}
          disabledSaveButton={validateForm()}
          maxWidth='md'
        >
         {loadingPaymentMethod ?
          <Loader /> :
          <form>
            <Grid container spacing={2}>
              <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                        name='paymentMethodType'
                        label='Tipo de Método de Pago'
                        placeholder='Seleccione el tipo de método de pago'
                        isSelect
                        selectOptions={paymentMethodTypeOptions}
                        control={control}
                    />
                  </Grid>

                  {watch('paymentMethodType') !== 2 ?
                    <Grid item xs={12} sm={6}>
                      <Input
                        name='bank'
                        label='Banco'
                        placeholder='Seleccione el banco'
                        isSelect
                        selectOptions={bankOptions}
                        control={control}
                      />
                    </Grid> : 
                    <Grid item xs={12} sm={6}>
                      <Input
                        name='description'
                        label='Descripción'
                        placeholder='Ingrese la descripción del método de pago'
                        type='text'
                        control={control}
                      />
                    </Grid>
                  }
              </Grid>

              {watch('paymentMethodType') !== 2 && 
                <>
                  <Grid container item spacing={spacing}>
                      <Grid item xs={12} sm={6}>
                        <Input
                            name='identificationType'
                            label='Tipo de Documento de Identidad'
                            placeholder='Seleccione el tipo de documento de identidad'
                            isSelect
                            selectOptions={identificationTypeOptions}
                            control={control}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Input
                            name='paymentMethodIdentification'
                            label='Documento de Identidad'
                            placeholder='Ingrese el documento de identidad'
                            type='number'
                            control={control}
                        />
                      </Grid>
                  </Grid>

                  <Grid container item spacing={spacing}>
                      <Grid item xs={12} sm={6}>
                          {watch("paymentMethodType") === 0 &&
                              <Input
                                  name='bankAcount'
                                  label='Número de Cuenta del Banco'
                                  placeholder='Ingrese el número de cuenta del banco'
                                  control={control}
                              />
                          }
                        
                          {watch("paymentMethodType") === 1 &&
                              <Input
                                  name='paymentMethodPhone'
                                  label='Número de Teléfono'
                                  placeholder='Ingrese el número de teléfono'
                                  control={control}
                              />
                          }
                      </Grid>
                  </Grid>
                </>
              }
            </Grid>
          </form>
         }
        </Modal>

        <DeleteModal 
          open={openDelete}
          handleClose={handleCloseDelete}
          onDelete={() => deleteItem()}
          loading={loadingDeletePaymentMethod}
        />

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
