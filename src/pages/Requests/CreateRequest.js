import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
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
import { getLevelOptions, postRequest } from '../../services/requests';
import { setLevelOptions, setLoadingCreateRequest } from '../../slices/requestsSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateRequest() {

  const levelOptions = useSelector(state => state.requests.levelOptions)
  const loadingCreateRequest = useSelector(state => state.requests.loadingCreateRequest)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      subject: '',
      level: '',
      description: '',
    }
  });

  useEffect(() => {
    const fetchLevelOptions = async () => {
      const resLevelOptions = await getLevelOptions()
      dispatch(setLevelOptions(resLevelOptions))
    }

    fetchLevelOptions()
  }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const onSubmit = (event) => {
    dispatch(setLoadingCreateRequest(true))

    console.log('submit');
    console.log('event ', event);

    const body = {
      ...event,
    }

    setTimeout(() => {
      const createRequest = async () => {
        const res = await postRequest(body)

        dispatch(setLoadingCreateRequest(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);
  
        if(res){
          setTimeout(() => {
            navigate('/dashboard/solicitudes-sugerencias')
          }, 2000)
        }
      }

      createRequest()
    }, 2000)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title='Crear Solicitud o Sugerencia'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Solicitud o Sugerencia
        </Typography>

        <FormCard>   
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input
                    name='subject'
                    label='Asunto'
                    placeholder='Ingrese un asunto'
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
                    name='level'
                    label='Nivel'
                    placeholder='Seleccione un nivel'
                    isSelect
                    selectOptions={levelOptions}
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    }}
                    error={errors.level}
                  />
                </Grid>
              </Grid>
              
              <Grid item xs={12}>
                <Input
                  name='description'
                  label='Descripción'
                  placeholder='Ingrese una descripción'
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
                    path="/dashboard/solicitudes-sugerencias"
                    defaultPadding
                    defaultMarginRight={smUp}
                  >
                    Volver
                  </OutlinedButton>
                </GridStyle>

                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                  <ContainedButton type='submit' defaultPadding loading={loadingCreateRequest}>
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

export { CreateRequest };
