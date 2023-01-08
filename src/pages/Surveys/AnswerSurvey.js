import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form"
// @mui
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { ContainedButton } from '../../components/ContainedButton';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader';
import { Input } from '../../components/Input';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { DownloadButton } from '../../components/DownloadButton';
//
import useResponsive from '../../hooks/useResponsive';
// 
import { getSurvey, putSurvey } from '../../services/surveys';
import { setSurvey, setLoadingSurvey, setLoadingCreateSurvey } from '../../slices/surveys';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function AnswerSurvey() {

  const { id } = useParams()

  const survey = useSelector(state => state.surveys.survey)
  console.log('survey ', survey);
  const loadingSurvey = useSelector(state => state.surveys.loadingSurvey)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const smUp = useResponsive('up', 'sm');

  const { control, handleSubmit, formState: { errors }, /* watch */ } = useForm({
    defaultValues: {
      question01: '',
      question02: '',
      question03: '',
      question04: '',
      question05: '',
    }
  });

  useEffect(() => {
    if(id){
      const fetchSurvey = async () => {
        dispatch(setLoadingSurvey(true))
        
        setTimeout(async ()=> {
          const res = await getSurvey(id)
          dispatch(setSurvey(res))
          dispatch(setLoadingSurvey(false))
        }, 1000)
      }

      fetchSurvey()
    } 
  }, [dispatch, id])

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const downloadFile = () => {
    console.log('descarga de archivo');
  };

  const onSubmit = (event) => {
    dispatch(setLoadingCreateSurvey(true))

    console.log('submit');
    console.log('event ', event);

    const body = {
      ...event,
    }

    setTimeout(() => {
      const editSurvey = async () => {
        const res = await putSurvey(body)
  
        dispatch(setLoadingCreateSurvey(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/encuestas')
          }, 2000)
        }
      }

      editSurvey()
    }, 2000)
  }

  return (
    <Page title="Responder Encuesta">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Responder Encuesta
        </Typography>

        {(id && loadingSurvey) ?
          <Loader /> :
          <FormCard>   
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography variant="h5">
                    {survey?.title || ''}
                  </Typography>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                  <Typography variant="body1">
                    {survey?.description || ''}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4} sx={{ mb: 2 }}>
                  <DownloadButton onClick={downloadFile} text='Archivo Adjunto' />
                </Grid>                

                {(survey?.questions?.length > 0) && 
                  survey.questions.map((item, index) => (
                    <Grid item xs={12} container spacing={2} key={index}>
                      <Grid item xs={12} container direction='row' alignItems='center'>
                        <Iconify icon="material-symbols:circle" width={8} height={8} sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="body1">
                          {item?.question || ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          {`(${item?.questionDescription || ''})`}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {item.type.value === 0 ? // Abierta
                          <Input
                            name={`question0${index + 1}`}
                            placeholder='Ingrese la respuesta'
                            type='text'
                            control={control}
                            validations={{
                              required: {
                                value: true,
                                message: 'El campo es requerido'
                              }
                            }}
                            error={errors[`question0${index + 1}`]}
                          />
                          : // Cerrada
                          <Input
                            name={`question0${index + 1}`}
                            placeholder='Seleccione la respuesta'
                            control={control}
                            isSelect
                            selectOptions={item?.options?.length > 0 ? item?.options : []}
                            validations={{
                              required: {
                                value: true,
                                message: 'El campo es requerido'
                              }
                            }}
                            error={errors[`question0${index + 1}`]}
                          />
                        }
                      </Grid>
                    </Grid>
                  ))
                }

                <Grid
                  item
                  spacing={2}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mt={5}
                >
                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                    <OutlinedButton 
                      isRouterLink 
                      path="/dashboard/encuestas"
                      defaultPadding
                      defaultMarginRight={smUp}
                    >
                        Volver
                    </OutlinedButton>
                  </GridStyle>

                  <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                    <ContainedButton 
                      type='submit' 
                      defaultPadding 
                      loading={false} 
                      // disabled={}
                    >
                        Responder
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

export { AnswerSurvey };
