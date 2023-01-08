import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, TableCell, TableRow, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
import { BasicTable } from '../../components/BasicTable';
//
// import { fDay } from '../../utils/formatTime';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getGeneralInfo, putGeneralInfo } from '../../services/customSettings';
// slices
import { setGeneralInfo, setLoadingGeneralInfo, setLoadingEditGeneralInfo } from '../../slices/customSettings';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

const LabelStyle = styled('span')(() => ({
  marginBottom: 8,
}));

// ----------------------------------------------------------------------

function GeneralInfo() {

  const generalInfo = useSelector(state => state.customSettings.generalInfo)
  console.log('generalInfo ', generalInfo);
  const loadingGeneralInfo = useSelector(state => state.customSettings.loadingGeneralInfo)
  const loadingEditGeneralInfo = useSelector(state => state.customSettings.loadingEditGeneralInfo)

  const dispatch = useDispatch()

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      condominiumName: '',
      address: '',
      phone: '',
      email: '',
      feeAmount: '',
      dueDate: '',
    }
  });

  useEffect(() => {
    const fetchGeneralInfo = async () => {
      dispatch(setLoadingGeneralInfo(true))
      
      setTimeout(async ()=> {
        const res = await getGeneralInfo()
        dispatch(setGeneralInfo(res))
        setFormValues()
        dispatch(setLoadingGeneralInfo(false))
      }, 1000)
    }

    fetchGeneralInfo()
  }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const setFormValues = () => {
    setValue("condominiumName", generalInfo?.condominiumName || '')
    setValue("address", generalInfo?.address || '')
    setValue("phone", generalInfo?.phone || '')
    setValue("email", generalInfo?.email || '')
    setValue("feeAmount", generalInfo?.feeAmount || '')
    setValue("dueDate", generalInfo?.dueDate || '')
  }

  const onSubmit = (event) => {
    dispatch(setLoadingEditGeneralInfo(true))

    console.log('event ', event);

    const body = {
     ...event,
    }

    setTimeout(() => {
      const submitGeneralInfo = async () => {
        let res = null;
        res = await putGeneralInfo(body)
        dispatch(setLoadingEditGeneralInfo(false))
        
        setColor(res ? 'success' : 'error')
        setOpen(true);
      }

      submitGeneralInfo()
    }, 2000)
  }

  const headers = ['Nombre', 'Teléfono', 'Email'];

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title='Información General'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Información General
        </Typography>

        {(loadingGeneralInfo) ?
          <Loader /> :
          <FormCard>   
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Input
                    name='condominiumName'
                    label='Nombre del Condominio'
                    placeholder='Ingrese el nombre del condominio'
                    type='text'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    }}
                    error={errors.condominiumName}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    name='address'
                    label='Contenido'
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

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='feeAmount'
                      label='Monto de la cuota mensual'
                      placeholder='Ingrese el monto'
                      type='number'
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        }
                      }}
                      error={errors.feeAmount}
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
                      name='dueDate'
                      label='Fecha de vencimiento de la cuota mensual'
                      placeholder='Selecciona una fecha'
                      isDate
                      control={control}
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        },
                      }}
                      error={errors.dueDate}
                    />
                  </Grid>
                </Grid>

                {generalInfo?.administrator && 
                  <Grid item xs={12}>
                    <LabelStyle>Administrador</LabelStyle>
                    <BasicTable 
                      headers={headers} 
                      elements={[generalInfo.administrator]}
                      mt={1}
                    >
                      {(row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{row?.name || ''}</TableCell>
                          <TableCell component="th" scope="row">{row?.phone || row?.phone}</TableCell>
                          <TableCell component="th" scope="row">{row?.email || row?.email}</TableCell>     
                        </TableRow>
                      )}
                    </BasicTable>
                  </Grid>
                }

                {(generalInfo?.condoBoard?.length > 0) && 
                  <Grid item xs={12}>
                    <LabelStyle>Junta de Condominio</LabelStyle>
                    <BasicTable 
                      headers={headers} 
                      elements={generalInfo.condoBoard}
                      mt={1}
                    >
                      {(row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{row?.name || ''}</TableCell>
                          <TableCell component="th" scope="row">{row?.phone || row?.phone}</TableCell>
                          <TableCell component="th" scope="row">{row?.email || row?.email}</TableCell>     
                        </TableRow>
                      )}
                    </BasicTable>
                  </Grid>
                }

                <Grid
                  container
                  item
                  spacing={2}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mt={8}
                >
                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                    <ContainedButton type='submit' defaultPadding loading={loadingEditGeneralInfo}>
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

export { GeneralInfo };
