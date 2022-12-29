import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
// @mui
import { 
  Container, 
  Typography, 
  Grid, 
  // Checkbox, 
  // FormControlLabel, 
  // IconButton,
  // TextField,
  // Autocomplete,
  // TableCell,
  // TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
// import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
// import { Input } from '../../components/Input';
import { ContainedButton } from '../../components/ContainedButton';
import { OutlinedButton } from '../../components/OutlinedButton';
// import { BasicTable } from '../../components/BasicTable';
import { Loader } from '../../components/Loader';
import Label from '../../components/Label';
import { DownloadButton } from '../../components/DownloadButton';
//
import useResponsive from '../../hooks/useResponsive';
import { fDate } from '../../utils/formatTime';
// import { getUsersOptions } from '../../services/surveys';
import { getSurvey } from '../../services/surveys';
// import { setUsersOptions } from '../../slices/surveys';
import { setSurvey, setLoadingSurvey } from '../../slices/surveys';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// const LabelStyle = styled('span')(() => ({
//   marginBottom: 8,
// }));

// const TableErrorMessage = styled('span')(({ theme }) => ({
//   paddingTop: theme.spacing(2), 
//   paddingLeft: theme.spacing(2), 
//   color: theme.palette.error.main
// }));

// ----------------------------------------------------------------------

function SurveyDetail() {

  const { id } = useParams()

  // const rolesOptions = useSelector(state => state.surveys.rolesOptions)
  // const usersOptions = useSelector(state => state.surveys.usersOptions)

  const survey = useSelector(state => state.surveys.survey)
  console.log('survey ', survey);
  const loadingSurvey = useSelector(state => state.surveys.loadingSurvey)

  const dispatch = useDispatch()

  // const { control, handleSubmit, formState: { errors }, watch } = useForm({
  //   defaultValues: {
  //     title: '',
  //     description: '',
  //     initialDate: new Date(),
  //     finalDate: new Date(),
  //     file: '',
  //     question: '',
  //     questionDescription: '',
  //     option: '',
  //   }
  // });

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

    // const fetchUsersOptions = async () => {
    //   const res = await getUsersOptions()
    //   dispatch(setUsersOptions(res))
    // }

    // fetchUsersOptions()
  }, [dispatch, id])

  const setStatusColor = () => {
    let color;

    if(survey?.status?.value === 0){ // Por enviar
      color = 'warning';

    }else if(survey?.status?.value === 1){ // Enviada
      color = 'success';

    }else if(survey?.status?.value === 2){ // Terminada
      color = 'default';
    }

    return color;
  }

  // const [file, setFile] = React.useState(null)

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const downloadFile = () => {
    console.log('descarga de archivo');
  };

  return (
    <Page title="Detalle de Encuesta">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Encuesta
        </Typography>

        {(id && loadingSurvey) ?
            <Loader /> :
            <FormCard>   
              <Grid container spacing={2}>

                <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    {survey?.title || ''}
                  </Typography>

                  <Label variant="ghost" color={setStatusColor()} sx={{ py: 2, px: 5 }}>
                    {survey?.status?.label || ''}
                  </Label>
                </Grid>

                <Grid item xs={12}>
                  <p>{survey?.description || ''}</p>
                </Grid>

                <Grid item container spacing={spacing}>
                  <Grid item container xs={12} sm={8}>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Día de inicio
                      </Typography>
                      <Typography variant="body2">
                        {survey?.initialDate ? fDate(survey.initialDate) : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Día final
                      </Typography>
                      <Typography variant="body2">
                        {survey?.finalDate ? fDate(survey.finalDate) : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" sx={{ fontWeight: 800 }}>
                        Días restantes
                      </Typography>
                      <Typography variant="body2">
                        Hola
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} container direction="row" justifyContent={smUp ? "flex-end" : 'center'} alignItems="center">
                    <DownloadButton onClick={downloadFile} text='Descargar' />
                  </Grid>
                </Grid>

                <Grid
                  item
                  spacing={2}
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  mt={8}
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
                      disabled={(survey?.status?.value === 1 || survey?.status?.value === 2)}
                    >
                        Enviar
                    </ContainedButton>
                  </GridStyle>
                </Grid>

              </Grid>
            </FormCard>
        }

      </Container>
    </Page>
  );
}

export { SurveyDetail };
