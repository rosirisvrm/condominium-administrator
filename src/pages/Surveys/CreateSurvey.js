import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
// @mui
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Checkbox, 
  FormControlLabel,
  IconButton
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
//
import useResponsive from '../../hooks/useResponsive';
import { getRoleOptions, postUser } from '../../services/users';
import { setRoleOptions, setLoadingCreateUser } from '../../slices/usersSlice';

// ----------------------------------------------------------------------

const StepperButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex', 
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  width: '100%',
  paddingTop: theme.spacing(2), 
  paddingLeft: theme.spacing(2),
  marginTop: theme.spacing(8),
}))

const StepperButtons = ({ handleBack, handleNext, activeStep, steps, smUp }) => (
  <StepperButtonsContainer>
    {activeStep === 0 ? 
      <OutlinedButton 
        isRouterLink
        path="/dashboard/encuestas"
        defaultPadding
        defaultMarginRight={smUp}
      >
        Volver
      </OutlinedButton>
      :
      <OutlinedButton 
        onClick={handleBack} 
        defaultPadding
        defaultMarginRight={smUp}
      >
        Volver
      </OutlinedButton>
    }

    <Box sx={{ flex: '1 1 auto' }} />

    {activeStep === steps - 1 ? 
      <ContainedButton type='submit' defaultPadding>
        Finalizar
      </ContainedButton>
      :
      <ContainedButton onClick={handleNext} defaultPadding>
        Siguiente
      </ContainedButton>
    }
  </StepperButtonsContainer>
)

StepperButtons.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
  smUp: PropTypes.bool,
}

// ----------------------------------------------------------------------

function CreateSurvey() {

  // const roleOptions = useSelector(state => state.users.roleOptions)
  // const loadingCreateUser = useSelector(state => state.users.loadingCreateUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue, getValues, watch, setError, clearErrors } = useForm({
    defaultValues: {
      title: '',
      description: '',
      initialDate: new Date(),
      finalDate: new Date(),
      file: '',
      question: '',
      questionDescription: ''
    }
  });

  useEffect(() => {
    const fetchRoleOptions = async () => {
      const res = await getRoleOptions()
      dispatch(setRoleOptions(res))
    }

    fetchRoleOptions()
  }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    // dispatch(setLoadingCreateUser(true))

    console.log('submit');
    console.log('event ', event);

    // const body = {
    //  ...event,
    //  file,
    // }

    // setTimeout(() => {
    //   const createUserRequest = async () => {
    //     const res = await postUser(body)
  
    //     dispatch(setLoadingCreateUser(false))
    //     setColor(res ? 'success' : 'error')
    //     setOpen(true);

    //     if(res){
    //       setTimeout(() => {
    //         navigate('/dashboard/encuestas')
    //       }, 2000)
    //     }
    //   }

    //   createUserRequest()
    // }, 2000)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const [activeStep, setActiveStep] = React.useState(0);
  const [validationMessage, setValidationMessage] = React.useState('');

  const steps = ['Información de la encuesta', 'Añadir preguntas', 'Seleccionar usuarios'];

  const handleNext = () => {

    let isValid = true;

    if(activeStep === 0){
      if(!getValues('title')){
        setError("title", { type: 'required', message: 'El campo es requerido' });
        isValid = false
      }else{
        clearErrors('title');
      }
      if(!getValues('description')){
        setError("description", { type: 'required', message: 'El campo es requerido' });
        isValid = false
      }else{
        clearErrors('description');
      }
    }

    if(activeStep === 1){
      if(questions.length === 0){
        setValidationMessage('No ha añadido ninguna pregunta, por favor añadir')
        isValid = false
      }else{
        setValidationMessage('')
      }
    }

    if(isValid){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } 
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [questions, setQuestions] = React.useState([])

  const addQuestion = () => {

    const newQuestions = [... questions, {
      question: getValues('question'),
      questionDescription: getValues('questionDescription'),
      type: checked ? { label: 'Cerrada' , value: 1 } : { label: 'Abierta', value: 0 }
    }]

    setQuestions(newQuestions)

    setValue("question", '')
    setValue("questionDescription", '')
    setValidationMessage('')
  }

  const deleteQuestion = (index) => {
    console.log('eliminando pregunta')

    const newQuestions = [... questions]

    newQuestions.splice(index, 1)

    setQuestions(newQuestions)
  }

  const headers = ['Pregunta', 'Tipo', ''];

  return (
    <Page title="Crear Encuesta">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Encuesta
        </Typography>

        <FormCard>   
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit(onSubmit)}>

            {activeStep === 0 && (
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Input
                    name='title'
                    label='Título'
                    placeholder='Ingrese un título'
                    type='text'
                    control={control}
                    error={errors.title}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    name='description'
                    label='Descripción'
                    placeholder='Ingrese una descripción'
                    multiline
                    type='text'
                    control={control}
                    error={errors.description}
                  />
                </Grid>

                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='initialDate'
                      label='Fecha inicio'
                      placeholder='Selecciona una fecha'
                      isDate
                      control={control}
                      error={errors.initialDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='finalDate'
                      label='Fecha fin'
                      placeholder='Selecciona una fecha'
                      isDate
                      control={control}
                      error={errors.finalDate}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} container direction="column">
                  <Input
                    name='file'
                    label='Asociar Archivo'
                    isFileUpload
                    control={control}
                    error={errors.file}
                    callback={handleFileUpload}
                    helperText={fileName}
                  />
                </Grid>

              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Input
                    name='question'
                    label='Pregunta'
                    placeholder='Ingrese una pregunta'
                    type='text'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
                    error={errors.question}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Input
                    name='questionDescription'
                    label='Descripción de la pregunta'
                    placeholder='Ingrese la descripción de la pregunta'
                    type='text'
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
                    error={errors.questionDescription}
                  />
                </Grid>

                <FormControlLabel sx={{ pt: 2, pl: 2 }} label="Pregunta cerrada" control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                }/>

                <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                  <OutlinedButton size='small' onClick={addQuestion} disabled={(!watch("question"))}>
                    Añadir pregunta
                  </OutlinedButton>
                </Grid>

                <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                  Preguntas añadidas
                </Typography>

                <TableContainer component={Paper} sx={{ pl: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {headers.map((header, index) => (
                          <TableCell key={index}>{header}</TableCell>  
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {questions.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">{row.question}</TableCell>
                          <TableCell>{row.type.label}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => deleteQuestion(index)} sx={{ p: 0 }}>
                              <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {validationMessage && 
                  <Typography variant="span" sx={{ pt: 2, pl: 2, color: 'red' }}>
                    {validationMessage}
                  </Typography>
                }
                
              </Grid>
            )}

            {activeStep === 2 && (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  Hola
                </Box>
              </>
            )}
        
            <StepperButtons
              handleBack={handleBack} 
              handleNext={handleNext} 
              activeStep={activeStep} 
              steps={steps.length} 
              smUp={smUp} 
            />
            
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

export { CreateSurvey };