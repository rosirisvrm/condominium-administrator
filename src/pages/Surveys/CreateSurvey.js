import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { 
  Container, 
  Typography, 
  Grid, 
  Checkbox, 
  FormControlLabel, 
  IconButton,
  TextField,
  Autocomplete,
  TableCell,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { BasicTable } from '../../components/BasicTable';
import { CustomStepper } from '../../components/CustomStepper';
//
import useResponsive from '../../hooks/useResponsive';
import { getRolesOptions, getUsersOptions, postSurvey } from '../../services/surveys';
import { setRolesOptions, setUsersOptions, setLoadingCreateSurvey } from '../../slices/surveys';

// ----------------------------------------------------------------------

const LabelStyle = styled('span')(() => ({
  marginBottom: 8,
}));

// ----------------------------------------------------------------------

function CreateSurvey() {

  const rolesOptions = useSelector(state => state.surveys.rolesOptions)
  const usersOptions = useSelector(state => state.surveys.usersOptions)
  const loadingCreateSurvey = useSelector(state => state.surveys.loadingCreateSurvey)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    getValues, 
    watch, 
    setError, 
    clearErrors 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      initialDate: new Date(),
      finalDate: new Date(),
      file: '',
      question: '',
      questionDescription: '',
      option: '',
    }
  });

  useEffect(() => {
    const fetchRolesOptions = async () => {
      const res = await getRolesOptions()
      dispatch(setRolesOptions(res))
    }

    fetchRolesOptions()

    const fetchUsersOptions = async () => {
      const res = await getUsersOptions()
      dispatch(setUsersOptions(res))
    }

    fetchUsersOptions()
  }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const [fileName, setFileName] = React.useState('')
  const [file, setFile] = React.useState(null)

  const onSubmit = (event) => {
    console.log(event);

    const isValid = validateForm();

    if(isValid){
      dispatch(setLoadingCreateSurvey(true))

      console.log('submit');
      console.log('event ', event);

      let body = {
       title: event.title,
       description: event.description,
       initialDate: event.initialDate,
       finalDate: event.finalDate,
       questions,
      }

      if(file){
        body = { ...body, file }
      }

      if(users.length > 0){
        body = { ...body, users }
      }else if(roles.length > 0){
        body = { ...body, users: roles }
      }

      setTimeout(() => {
        const createSurvey = async () => {
          const res = await postSurvey(body)
    
          dispatch(setLoadingCreateSurvey(false))
          setColor(res ? 'success' : 'error')
          setOpen(true);

          if(res){
            setTimeout(() => {
              navigate('/dashboard/encuestas')
            }, 2000)
          }
        }

        createSurvey()
      }, 2000)
    }
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const [activeStep, setActiveStep] = React.useState(0);
  const [validationMessage, setValidationMessage] = React.useState('');
  const [rolesMessage, setRolesMessage] = React.useState('');
  const [usersMessage, setUsersMessage] = React.useState('');

  const steps = ['Información de la encuesta', 'Añadir preguntas', 'Seleccionar usuarios'];

  const validateForm = () => {

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

    if(activeStep === 2){
      if(!checkedRole && users.length === 0){
        setUsersMessage('No ha añadido ningún usuario, por favor añadir')
        isValid = false
      }else if(checkedRole && roles.length === 0){
        setRolesMessage('No ha añadido usuarios por rol, por favor añadir')
        isValid = false
      } else{
        setUsersMessage('')
        setRolesMessage('')
      }
    }

    return isValid;
  }

  const handleNext = () => {

    const isValid = validateForm();

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

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const [checkedRole, setCheckedRole] = React.useState(false);

  const handleChangeCheckedRole = (event) => {
    setCheckedRole(event.target.checked);

    setUsers([])
    setRoles([])
    setValidationMessage('')
  };

  const [questions, setQuestions] = React.useState([])
  const [options, setOptions] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [roles, setRoles] = React.useState([])

  const addQuestion = () => {
    const newQuestions = [... questions, {
      question: getValues('question'),
      questionDescription: getValues('questionDescription'),
      type: checked ? { label: 'Cerrada' , value: 1 } : { label: 'Abierta', value: 0 },
      options,
    }]

    setQuestions(newQuestions)
    setValue("question", '')
    setValue("questionDescription", '')
    setValidationMessage('')
    setOptions([])
  }

  const deleteQuestion = (index) => {

    const newQuestions = [... questions]

    newQuestions.splice(index, 1)

    setQuestions(newQuestions)
  }

  const addOption = () => {
    
    const newOptions = [... options, {
      option: getValues('option'),
    }]

    setOptions(newOptions)
    setValue("option", '')
  }

  const deleteOption = (index) => {

    const newOptions = [... options]

    newOptions.splice(index, 1)

    setOptions(newOptions)
  }

  const addUser = () => {
    const newUsers = [... users, autocomplete]

    setUsers(newUsers)
    setAutocomplete(null)
    setUsersMessage('')
  }

  const deleteUser = (index) => {

    const newUsers = [... users]

    newUsers.splice(index, 1)

    setUsers(newUsers)
  }

  const addRole = () => {
    const newRoles = [... roles, autocomplete]

    setRoles(newRoles)
    setAutocomplete(null)
    setRolesMessage('')
  }

  const deleteRole = (index) => {

    const newRoles = [... roles]

    newRoles.splice(index, 1)

    setRoles(newRoles)
  }

  const headersQuestions = ['Pregunta', 'Tipo', ''];

  const headersUsers = ['Usuario', 'Dirección', ''];

  const headersRoles = ['Rol', 'Cantidad de usuarios', ''];

  const [autocomplete, setAutocomplete] = React.useState(null);

  return (
    <Page title="Crear Encuesta">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Encuesta
        </Typography>

        <FormCard>   
          <form onSubmit={handleSubmit(onSubmit)}>

            <CustomStepper 
              activeStep={activeStep} 
              steps={steps} 
              loading={loadingCreateSurvey}
              handleNext={handleNext}
              handleBack={handleBack}
            >

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
                      accept='.pdf, .doc, .docx, image/*, .xlsx'
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

                  <Grid item xs={12}>
                    <FormControlLabel label="Pregunta cerrada" control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeChecked}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }/>
                  </Grid>

                  {checked && 
                    <>
                      <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                        Añadir opciones
                      </Typography>

                      <Grid container item spacing={3}>
                        <Grid item xs={12} sm={4}>
                          <Input
                            name='option'
                            label='Opción'
                            placeholder='Ingrese la opción'
                            type='text'
                            control={control}
                            error={errors.option}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} container direction="row" justifyContent="center" alignItems="flex-end">
                          <OutlinedButton size='small' onClick={addOption} disabled={(!watch("option"))}>
                            Añadir opción
                          </OutlinedButton>
                        </Grid>
                      </Grid>

                      {options.length > 0 &&
                        <>
                          <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                            Opciones añadidas
                          </Typography>
                          
                          {options.map((option, index) => (
                            <Grid container item spacing={3} key={index}>
                              <Grid item xs={6} sm={4}>
                                <Typography variant="span">{option.option}</Typography>
                              </Grid>
                              <Grid item xs={6} sm={4} container direction="row" justifyContent="center">
                                <IconButton onClick={() => deleteOption(index)} sx={{ p: 0 }}>
                                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                </IconButton>
                              </Grid>  
                            </Grid>  
                          ))}
                        </>
                      }

                    </>
                  }

                  <Grid container item direction="row" justifyContent="flex-end" alignItems="flex-end">
                    <OutlinedButton 
                      size='small' 
                      onClick={addQuestion} 
                      disabled={(
                        (!checked && !watch("question")) || 
                        (checked && !watch("question")) ||
                        (checked && options.length < 2)
                      )}
                    >
                      Añadir pregunta
                    </OutlinedButton>
                  </Grid>

                  {questions.length > 0 && 
                    <>
                      <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                        Preguntas añadidas
                      </Typography>

                      <BasicTable headers={headersQuestions} elements={questions}>
                        {(row, index) => (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.question}</TableCell>
                            <TableCell>{row.type.label}</TableCell>
                            <TableCell>
                              <IconButton onClick={() => deleteQuestion(index)} sx={{ p: 0 }}>
                                <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        )}
                      </BasicTable>
                    </>
                  }

                  {validationMessage && 
                    <Typography variant="span" sx={{ pt: 2, pl: 2, color: 'red' }}>
                      {validationMessage}
                    </Typography>
                  }
                  
                </Grid>
              )}

              {activeStep === 2 && (
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <FormControlLabel label="Enviar por rol" control={
                      <Checkbox
                        checked={checkedRole}
                        onChange={handleChangeCheckedRole}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }/>
                  </Grid>

                  {!checkedRole ?
                    <>
                      <Grid container item spacing={3}>
                        <Grid item xs={12} sm={9} container direction="column">
                          <LabelStyle>Buscar usuarios</LabelStyle>
                          <Autocomplete
                            id="users-selection-autocomplete"
                            value={autocomplete}
                            onChange={(event, newValue) => {
                              setAutocomplete(newValue);
                            }}
                            options={usersOptions}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} placeholder='Ingrese el nombre del usuario a buscar' />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3} container direction="row" justifyContent="center" alignItems="flex-end">
                          <OutlinedButton 
                            size='small'
                            defaultPadding
                            onClick={addUser} 
                            disabled={(!autocomplete)}
                          >
                            Añadir
                          </OutlinedButton>
                        </Grid>
                      </Grid>

                      {users.length > 0 &&
                        <BasicTable headers={headersUsers} elements={users}>
                          {(row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">{row.label}</TableCell>
                              <TableCell>{row.address}</TableCell>
                              <TableCell>
                                <IconButton onClick={() => deleteUser(index)} sx={{ p: 0 }}>
                                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </BasicTable>
                      }

                      {usersMessage && 
                        <Typography variant="span" sx={{ pt: 2, pl: 2, color: 'red' }}>
                          {usersMessage}
                        </Typography>
                      }

                    </> 
                    :
                    <>
                      <Grid container item spacing={3}>

                        <Grid item xs={12} sm={9} container direction="column">
                          <LabelStyle>Seleccionar rol</LabelStyle>
                          <Autocomplete
                            id="users-selection-autocomplete"
                            value={autocomplete}
                            onChange={(event, newValue) => {
                              setAutocomplete(newValue);
                            }}
                            options={rolesOptions}
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} placeholder='Seleccione el rol' />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={3} container direction="row" justifyContent="center" alignItems="flex-end">
                          <OutlinedButton 
                            size='small'
                            defaultPadding
                            onClick={addRole} 
                            disabled={(!autocomplete)}
                          >
                            Añadir
                          </OutlinedButton>
                        </Grid>
                        
                      </Grid>

                      {roles.length > 0 && 
                        <BasicTable headers={headersRoles} elements={roles}>
                          {(row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell component="th" scope="row">{row.label}</TableCell>
                              <TableCell>{row.amount}</TableCell>
                              <TableCell>
                                <IconButton onClick={() => deleteRole(index)} sx={{ p: 0 }}>
                                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          )}
                        </BasicTable>
                      }

                      {rolesMessage && 
                        <Typography variant="span" sx={{ pt: 2, pl: 2, color: 'red' }}>
                          {rolesMessage}
                        </Typography>
                      }

                    </> 
                  }

                </Grid>
              )}

            </CustomStepper>
            
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
