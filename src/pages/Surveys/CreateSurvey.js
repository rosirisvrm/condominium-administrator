import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';
// @mui
import { Container, Typography, Grid, Box, Stepper, Step, StepLabel } from '@mui/material';
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

StepperButtons.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  activeStep: PropTypes.number,
  smUp: PropTypes.bool,
}

const StepperButtons = ({ handleBack, handleNext, activeStep, smUp }) => (
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

    <ContainedButton 
      onClick={handleNext}
      defaultPadding
    >
      Siguiente
    </ContainedButton>
  </StepperButtonsContainer>
)

// ----------------------------------------------------------------------

function CreateSurvey() {

  // const roleOptions = useSelector(state => state.users.roleOptions)
  // const loadingCreateUser = useSelector(state => state.users.loadingCreateUser)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      initilDate: new Date(),
      finalDate: new Date(),
      file: '',
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
    dispatch(setLoadingCreateUser(true))

    console.log('submit');
    console.log('event ', event);

    const body = {
     ...event,
     file,
    }

    setTimeout(() => {
      const createUserRequest = async () => {
        const res = await postUser(body)
  
        dispatch(setLoadingCreateUser(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/encuestas')
          }, 2000)
        }
      }

      createUserRequest()
    }, 2000)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const [activeStep, setActiveStep] = React.useState(0);

  const steps = ['Información de la encuesta', 'Añadir preguntas', 'Seleccionar usuarios'];

  const handleNext = () => {

    if(activeStep === steps.length - 1){
      navigate('/dashboard/encuestas')
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileUpload = (files) => {
    setFileName(files[0]?.name || '')
    setFile(files[0])
  }

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
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
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
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      },
                    }}
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
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        },
                      }}
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
                      validations={{
                        required: {
                          value: true,
                          message: 'El campo es requerido'
                        },
                      }}
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
                
                <StepperButtons handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} smUp={smUp} />

              </Grid>
            )}

            {activeStep === 1 && (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <StepperButtons handleBack={handleBack} handleNext={handleNext} />
                </Box>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <StepperButtons handleBack={handleBack} handleNext={handleNext} />
                </Box>
              </>
            )}
        
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
