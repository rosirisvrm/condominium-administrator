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
import { BasicTable } from '../../components/BasicTable';
//
import useResponsive from '../../hooks/useResponsive';
// import { getRolesOptions, getUsersOptions } from '../../services/surveys';
// import { setRolesOptions, setUsersOptions } from '../../slices/surveys';

// ----------------------------------------------------------------------

const LabelStyle = styled('span')(() => ({
  marginBottom: 8,
}));

const TableErrorMessage = styled('span')(({ theme }) => ({
  paddingTop: theme.spacing(2), 
  paddingLeft: theme.spacing(2), 
  color: theme.palette.error.main
}));

// ----------------------------------------------------------------------

function SurveyDetail() {

  const { id } = useParams()

  const rolesOptions = useSelector(state => state.surveys.rolesOptions)
  const usersOptions = useSelector(state => state.surveys.usersOptions)
//   const loadingCreateSurvey = useSelector(state => state.surveys.loadingCreateSurvey)

  const dispatch = useDispatch()

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
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

    // const fetchRolesOptions = async () => {
    //   const res = await getRolesOptions()
    //   dispatch(setRolesOptions(res))
    // }

    // fetchRolesOptions()

    // const fetchUsersOptions = async () => {
    //   const res = await getUsersOptions()
    //   dispatch(setUsersOptions(res))
    // }

    // fetchUsersOptions()
  }, [dispatch])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [fileName, setFileName] = React.useState('')
//   const [file, setFile] = React.useState(null)

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  const [checked, setChecked] = React.useState(false);

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const [checkedRole, setCheckedRole] = React.useState(false);

  const handleChangeCheckedRole = (event) => {
    setCheckedRole(event.target.checked);

    setUsers([])
    setRoles([])
    setAutocomplete(null)
  };

  const [questions, setQuestions] = React.useState([])
  const [options, setOptions] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [roles, setRoles] = React.useState([])

  const headersQuestions = ['Pregunta', 'Tipo', ''];

  const headersUsers = ['Usuario', 'Dirección', ''];

  const headersRoles = ['Rol', 'Cantidad de usuarios', ''];

  const [autocomplete, setAutocomplete] = React.useState(null);

  return (
    <Page title="Detalle de Encuesta">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Encuesta
        </Typography>

        <FormCard>   
              {/* {activeStep === 0 && (
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

                      <BasicTable 
                        headers={headersQuestions} 
                        elements={questions}
                        caption={`La encuesta tendrá un total de 
                          ${questions.length} ${questions.length === 1 ? 'pregunta' : 'preguntas'}
                        `}
                      >
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

                  {validationMessage && <TableErrorMessage>{validationMessage}</TableErrorMessage>}
                  
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
                        <BasicTable 
                          headers={headersUsers} 
                          elements={users} 
                          caption={`La encuesta será enviada a un total de 
                            ${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}
                          `}
                        >
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

                      {usersMessage && <TableErrorMessage>{usersMessage}</TableErrorMessage>}
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
                        <BasicTable 
                          headers={headersRoles} 
                          elements={roles}
                        >
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

                      {rolesMessage && <TableErrorMessage>{rolesMessage}</TableErrorMessage>}
                    </> 
                  }

                </Grid>
              )} */}
        </FormCard>

      </Container>
    </Page>
  );
}

export { SurveyDetail };
