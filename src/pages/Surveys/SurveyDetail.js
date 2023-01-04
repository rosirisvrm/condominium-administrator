import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
// @mui
import { 
  Container, 
  Typography, 
  Grid, 
  Checkbox, 
  FormControlLabel,
  IconButton,
  // TextField,
  // Autocomplete,
  TableCell,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { ContainedButton } from '../../components/ContainedButton';
import { OutlinedButton } from '../../components/OutlinedButton';
import { BasicTable } from '../../components/BasicTable';
import { Loader } from '../../components/Loader';
import { DownloadButton } from '../../components/DownloadButton';
import { Modal } from '../../components/Modal';
//
import useResponsive from '../../hooks/useResponsive';
import { fDate, fDateDistance } from '../../utils/formatTime';
// 
import { getSurvey, getUsersStatusOptions } from '../../services/surveys';
import { setSurvey, setLoadingSurvey, setUsersStatusOptions } from '../../slices/surveys';

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

  const survey = useSelector(state => state.surveys.survey)
  const loadingSurvey = useSelector(state => state.surveys.loadingSurvey)
  const usersStatusOptions = useSelector(state => state.surveys.usersStatusOptions)

  const dispatch = useDispatch()

  const { control } = useForm({
    defaultValues: {
      usersStatus: '',
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

    const fetchUsersStatusOptions = async () => {
      const res = await getUsersStatusOptions()
      dispatch(setUsersStatusOptions(res))
    }

    fetchUsersStatusOptions()
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

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const downloadFile = () => {
    console.log('descarga de archivo');
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const headersUsers = ['Usuario', 'Estado'];

  // const [file, setFile] = React.useState(null)

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
                  <Typography variant="h5">
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
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Día de inicio
                      </Typography>
                      <Typography variant="body2">
                        {survey?.initialDate ? fDate(survey.initialDate) : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Día final
                      </Typography>
                      <Typography variant="body2">
                        {survey?.finalDate ? fDate(survey.finalDate) : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Días restantes
                      </Typography>
                      <Typography variant="body2">
                        {(survey?.initialDate && survey?.finalDate) ? 
                          fDateDistance(survey?.initialDate, survey?.finalDate) : ''
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={4} container direction="row" justifyContent={smUp ? "flex-end" : 'center'} alignItems="center">
                    <DownloadButton onClick={downloadFile} text='Archivo Adjunto' />
                  </Grid>
                </Grid>

                <Grid item xs={12} container direction="row">
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Usuarios Encuestados
                  </Typography>
                  <IconButton onClick={handleClickOpen} sx={{ p: 0, ml: 1 }}>
                    <Iconify icon="charm:eye" width={24} height={24} />
                  </IconButton>
                </Grid>

                <Grid item container spacing={spacing}>
                  <Grid item container xs={12} sm={8}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Respondieron
                      </Typography>
                      <Typography variant="body2">
                        70
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Por responder
                      </Typography>
                      <Typography variant="body2">
                        30
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        Total
                      </Typography>
                      <Typography variant="body2">
                        100
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} container direction="row">
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Preguntas
                  </Typography>
                  <IconButton onClick={() => console.log('abriendo detalle de usuarios')} sx={{ p: 0, ml: 1 }}>
                    <Iconify icon="charm:eye" width={24} height={24} />
                  </IconButton>
                </Grid>

                <Grid item container xs={12} sm={8}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Abiertas
                    </Typography>
                    <Typography variant="body2">
                      7
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Cerradas
                    </Typography>
                    <Typography variant="body2">
                      3
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      Total
                    </Typography>
                    <Typography variant="body2">
                      10
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} container direction="row">
                  <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    Respuestas
                  </Typography>
                  <IconButton onClick={() => console.log('abriendo detalle de usuarios')} sx={{ p: 0, ml: 1 }}>
                    <Iconify icon="charm:eye" width={24} height={24} />
                  </IconButton>
                </Grid>                

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
                      disabled={(survey?.status?.value === 1 || survey?.status?.value === 2)}
                    >
                        Enviar
                    </ContainedButton>
                  </GridStyle>
                </Grid>

              </Grid>
            </FormCard>
        }

        <Modal 
          open={dialogOpen}
          handleClose={handleClose}
          title='Usuarios Encuestados'
          closeButtonText='Cerrar'
          maxWidth='md'
          sx={{
            p: 5
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel label="Vista gráfica" control={
                <Checkbox
                  checked={checked}
                  onChange={handleChangeChecked}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }/>
            </Grid>

            <Grid item container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Input
                  name='usersStatus'
                  label='Filtrar usuarios'
                  placeholder='Seleccione un estado para filtrar'
                  isSelect
                  selectOptions={usersStatusOptions}
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={8} container justifyContent='flex-end' alignItems='flex-end'>
                <Typography variant="body2">
                  Total : {survey?.users?.length || ''} usuarios
                </Typography>
              </Grid>
            </Grid>

            {survey?.users?.length > 0 &&
              <Grid item xs={12}>
                <BasicTable headers={headersUsers} elements={survey.users}>
                  {(row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell>Respondió</TableCell>
                    </TableRow>
                  )}
                </BasicTable>
              </Grid>
            }
          </Grid>
        </Modal>

      </Container>
    </Page>
  );
}

export { SurveyDetail };
