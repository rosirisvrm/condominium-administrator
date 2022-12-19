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
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getProvider, postProvider, putProvider } from '../../services/providers';
import { getPaymentMethodTypeOptions, getBankOptions, getIdentificationTypeOptions } from '../../services/customSettings';
// slices
import { setLoadingCreateProvider, setLoadingProvider, setProvider, setLoadingEditProvider } from '../../slices/providers';
import { setPaymentMethodTypeOptions, setBankOptions, setIdentificationTypeOptions } from '../../slices/customSettings';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateProvider() {

  const { id } = useParams()

  const provider = useSelector(state => state.providers.provider)
  const loadingProvider = useSelector(state => state.providers.loadingProvider)
  const loadingCreateProvider = useSelector(state => state.providers.loadingCreateProvider)
  const loadingEditProvider = useSelector(state => state.providers.loadingEditProvider)

  const paymentMethodTypeOptions = useSelector(state => state.customSettings.paymentMethodTypeOptions)
  const bankOptions = useSelector(state => state.customSettings.bankOptions)
  const identificationTypeOptions = useSelector(state => state.customSettings.identificationTypeOptions)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      companyName: '',
      companyDescription: '',
      product: '',
      productDescription: '',
      address: '',
      phone: '',
      email: '',
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
        const fetchProvider = async () => {
            dispatch(setLoadingProvider(true))
            
            setTimeout(async ()=> {
                const res = await getProvider(id)
                dispatch(setProvider(res))
                setFormValues(res)
                dispatch(setLoadingProvider(false))
            }, 1000)
        }

        fetchProvider()
    }

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

  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    if(!id){
        dispatch(setLoadingCreateProvider(true))
    }else{
        dispatch(setLoadingEditProvider(true))
    }

    console.log('submit');
    console.log('event ', event);
    console.log('provider ', provider);

    const body = {
     ...event,
     phone: parseInt(event.phone, 10),
     file
    }

    setTimeout(() => {
      const submitEmployee = async () => {
        let res = null;
  
        if(!id){
            res = await postProvider(body)
            dispatch(setLoadingCreateProvider(false))
        }else{
            res = await putProvider(id, body)
            dispatch(setLoadingEditProvider(false))
        }

        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/proveedores')
          }, 2000)
        }
      }

      submitEmployee()
    }, 2000)
  }

  const setFormValues = (provider) => {
    setValue("companyName", provider?.companyName || '')
    setValue("companyDescription", provider?.companyDescription || '')
    setValue("product", provider?.product || '')
    setValue("productDescription", provider?.productDescription || '')
    setValue("address", provider?.address || '')
    setValue("phone", provider?.phone || '')
    setValue("email", provider?.email || '')

    setValue("paymentMethodType", provider?.paymentMethod ? provider.paymentMethod?.paymentMethodType?.value : '')
    setValue("bank", provider?.paymentMethod ? provider.paymentMethod?.bank?.value : '')
    setValue("identificationType", provider?.paymentMethod ? provider.paymentMethod?.identificationType?.value : '')
    setValue("paymentMethodIdentification", provider?.paymentMethod?.paymentMethodIdentification || '')
    setValue("bankAcount", provider?.paymentMethod?.bankAcount || '')
    setValue("paymentMethodPhone", provider?.paymentMethod?.paymentMethodPhone || '')

    // Falta setear file
    setFileName(provider?.file)
  }

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Proveedor`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Proveedor`}
        </Typography>

        {(id && loadingProvider) ?
            <Loader /> :
            <FormCard>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>

                    <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                        Información de la Compañía
                    </Typography>

                    <Grid container item spacing={spacing}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                name='companyName'
                                label='Nombre de la Compañía'
                                placeholder='Ingrese el nombre de la compañía'
                                type='text'
                                control={control}
                                validations={{
                                required: {
                                    value: true,
                                    message: 'El campo es requerido'
                                }
                                }}
                                error={errors.companyName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Input
                                name='companyDescription'
                                label='Descripción de la Compañía'
                                placeholder='Ingrese la descripción de la compañía'
                                type='text'
                                control={control}
                                validations={{
                                required: {
                                    value: true,
                                    message: 'El campo es requerido'
                                }
                                }}
                                error={errors.companyDescription}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item spacing={spacing}>
                        <Grid item xs={12} sm={6}>
                            <Input
                                name='product'
                                label='Producto'
                                placeholder='Ingrese el nombre del producto dotado'
                                type='text'
                                control={control}
                                validations={{
                                required: {
                                    value: true,
                                    message: 'El campo es requerido'
                                }
                                }}
                                error={errors.product}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Input
                                name='productDescription'
                                label='Descripción del Producto'
                                placeholder='Ingrese la descripción del producto dotado'
                                type='text'
                                control={control}
                                validations={{
                                required: {
                                    value: true,
                                    message: 'El campo es requerido'
                                }
                                }}
                                error={errors.productDescription}
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

                    <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                        Método de Pago
                    </Typography>

                    <Grid container item spacing={spacing}>
                        <Grid item xs={12} sm={6}>
                        <Input
                            name='paymentMethodType'
                            label='Tipo de Método de Pago'
                            placeholder='Seleccione el tipo de método de pago'
                            isSelect
                            selectOptions={paymentMethodTypeOptions}
                            control={control}
                            validations={{
                            required: {
                                value: true,
                                message: 'El campo es requerido'
                            }
                            }}
                            error={errors.paymentMethodType}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <Input
                            name='bank'
                            label='Banco'
                            placeholder='Seleccione el banco'
                            isSelect
                            selectOptions={bankOptions}
                            control={control}
                            validations={{
                            required: {
                                value: true,
                                message: 'El campo es requerido'
                            }
                            }}
                            error={errors.bank}
                        />
                        </Grid>
                    </Grid>

                    <Grid container item spacing={spacing}>
                        <Grid item xs={12} sm={6}>
                        <Input
                            name='identificationType'
                            label='Tipo de Documento de Identidad'
                            placeholder='Seleccione el tipo de documento de identidad'
                            isSelect
                            selectOptions={identificationTypeOptions}
                            control={control}
                            validations={{
                            required: {
                                value: true,
                                message: 'El campo es requerido'
                            }
                            }}
                            error={errors.identificationType}
                        />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                        <Input
                            name='paymentMethodIdentification'
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
                            error={errors.paymentMethodIdentification}
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
                                    placeholder='Ingrese el número de cuenta del banco'
                                    control={control}
                                    validations={{
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    }
                                    }}
                                    error={errors.bankAcount}
                                />
                            }
                                
                            {/* Pago móvil */}
                            {watch("paymentMethodType") === 1 &&
                                <Input
                                    name='paymentMethodPhone'
                                    label='Número de Teléfono'
                                    placeholder='Ingrese el número de teléfono'
                                    control={control}
                                    validations={{
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    }
                                    }}
                                    error={errors.paymentMethodPhone}
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
                            path="/dashboard/proveedores"
                            defaultPadding
                            defaultMarginRight={smUp}
                        >
                            Volver
                        </OutlinedButton>
                        </GridStyle>

                        <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                        <ContainedButton type='submit' defaultPadding loading={!id ? loadingCreateProvider : loadingEditProvider}>
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

export { CreateProvider };
