import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader';
import { DownloadButton } from '../../components/DownloadButton';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getProvider } from '../../services/providers';
// slices
import { setLoadingProvider, setProvider } from '../../slices/providers';

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

function ProviderDetail() {

  const { id } = useParams()

  const provider = useSelector(state => state.providers.provider)
  const loadingProvider = useSelector(state => state.providers.loadingProvider)

  const dispatch = useDispatch()

  const { control, setValue, watch } = useForm({
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
                setFormValues()
                dispatch(setLoadingProvider(false))
            }, 1000)
        }

        fetchProvider()
    }

  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [fileName, setFileName] = React.useState('')
//   const [file, setFile] = React.useState(null)

  const setFormValues = () => {
    setValue("companyName", provider?.companyName || '')
    setValue("companyDescription", provider?.companyDescription || '')
    setValue("product", provider?.product || '')
    setValue("productDescription", provider?.productDescription || '')
    setValue("address", provider?.address || '')
    setValue("phone", provider?.phone || '')
    setValue("email", provider?.email || '')

    setValue("paymentMethodType", provider?.paymentMethod ? provider.paymentMethod?.paymentMethodType?.label : '')
    setValue("bank", provider?.paymentMethod ? provider.paymentMethod?.bank?.label : '')
    setValue("identificationType", provider?.paymentMethod ? provider.paymentMethod?.identificationType?.label : '')
    setValue("paymentMethodIdentification", provider?.paymentMethod?.paymentMethodIdentification || '')
    setValue("bankAcount", provider?.paymentMethod?.bankAcount || '')
    setValue("paymentMethodPhone", provider?.paymentMethod?.paymentMethodPhone || '')

    // Falta setear file
    setFileName(provider?.file)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const downloadFile = () => {
    console.log('descarga de archivo');
  };

  return (
    <Page title='Detalle de Proveedor'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Proveedor
        </Typography>

        {(id && loadingProvider) ?
            <Loader /> :
            <FormCard>   
                <form>
                    <Grid container spacing={2}>

                        <Typography variant="h6" sx={{ pt: 2, pl: 2, my: 2 }}>
                            Información de la Compañía
                        </Typography>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='companyName'
                                    label='Nombre de la Compañía'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='companyDescription'
                                    label='Descripción de la Compañía'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='product'
                                    label='Producto'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='productDescription'
                                    label='Descripción del Producto'
                                    disabled
                                    type='text'
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
                            <Grid item xs={12} sm={6} container direction='column'>
                                <LabelStyle>
                                    Archivo
                                </LabelStyle>
                                {fileName && 
                                    <BoxStyle>
                                        <DownloadButton onClick={downloadFile} text='Descargar' />
                                    </BoxStyle>
                                } 
                            </Grid>
                        </Grid>

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
                                    label='Tipo de Documento de Identidad'
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
                                    path="/dashboard/proveedores"
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

export { ProviderDetail };
