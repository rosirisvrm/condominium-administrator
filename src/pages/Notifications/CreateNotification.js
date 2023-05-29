import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { 
    Container, 
    Typography, 
    Grid,
    Checkbox, 
    FormControlLabel, 
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { UsersSelector } from '../../components/UsersSelector';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { 
    getNotification, 
    postNotification, 
    putNotification
} from '../../services/notifications';
// slices
import { 
    setLoadingCreateNotification, 
    setLoadingNotification, 
    setNotification, 
    setLoadingEditNotification
} from '../../slices/notifications';
import { getRolesOptions } from '../../services/surveys';
import { setRolesOptions } from '../../slices/surveys';
import { getUsers } from '../../services/users';
import { setUsers as setUsersRedux } from '../../slices/usersSlice';
import { setNewNotification } from '../../slices/routes';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function CreateNotification() {

  const { id } = useParams()

  const notification = useSelector(state => state.notifications.notification)
  const loadingNotification = useSelector(state => state.notifications.loadingNotification)
  const loadingCreateNotification = useSelector(state => state.notifications.loadingCreateNotification)
  const loadingEditNotification = useSelector(state => state.notifications.loadingEditNotification)
  const rolesOptions = useSelector(state => state.surveys.rolesOptions)
  const usersOptions = useSelector(state => state.users.usersList)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const smUp = useResponsive('up', 'sm');

  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [checkedRole, setCheckedRole] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [isPrograming, setIsPrograming] = useState(false)

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    setValue,
    getValues,
    watch 
} = useForm({
    defaultValues: {
      title: '',
      text: '',
      date: new Date(),
      hour: new Date(),
    }
  });

  useEffect(() => {
    if(id){
        const fetchNotification = async () => {
            dispatch(setLoadingNotification(true))
            
            setTimeout(async ()=> {
                const res = getNotification(id)
                dispatch(setNotification(res))
                setFormValues()
                dispatch(setLoadingNotification(false))
            }, 1000)
        }

        fetchNotification()
    }

    const fetchRolesOptions = async () => {
        const res = await getRolesOptions()
        dispatch(setRolesOptions(res))
    }
    fetchRolesOptions()
  
    const fetchUsersOptions = async () => {
        const res = await getUsers()
        dispatch(setUsersRedux(res))
    }
    fetchUsersOptions()
  }, [dispatch, id])

  const setFormValues = () => {
    setValue("title", notification?.title || '')
    setValue("text", notification?.text || '')
    setValue("date", notification?.date || '')
    setValue("hour", notification?.hour || '')
    setValue("author", notification?.author ? notification?.author?.name : '')

    if(notification?.users?.length > 0){
        setUsers(notification.users)
    }
  }

  const onSubmit = (event = null) => {
    if(!id){
        dispatch(setLoadingCreateNotification(true))
    }else{
        dispatch(setLoadingEditNotification(true))
    }

    // console.log('event ', event);
    // console.log('users ', users);
    // console.log('roles ', roles);

    const body = event ? {
        ...event,
        id: '4',
        users: [
            ... users
        ],
        author: {
            id: '0',
            name: 'Rosiris Romero',
            address: 'Manzana 12 - 9',
        },
        status: { label: 'Enviada', value: 1 }
    } : {
        id: '4',
        title: getValues('title'),
        text: getValues('text'),
        date: getValues('date'),
        hour: getValues('hour'),
        users: [
            ... users
        ],
        author: {
            id: '0',
            name: 'Rosiris Romero',
            address: 'Manzana 12 - 9',
        },
        status: { label: 'Programada', value: 0 }
    }

    setTimeout(() => {
      const submitNotification = async () => {
        let res = null;
  
        if(!id){
            res = await postNotification(body)
            dispatch(setNewNotification(body))
            dispatch(setLoadingCreateNotification(false))
        }else{
            res = await putNotification(id, body)
            dispatch(setLoadingEditNotification(false))
        }

        setColor(res ? 'success' : 'error')
        setOpen(true);

        if(res){
          setTimeout(() => {
            navigate('/dashboard/notificaciones')
          }, 2000)
        }
      }

      submitNotification()
    }, 2000)
  }

  const handleChangeCheckedRole = (event) => {
    setCheckedRole(event.target.checked);

    setUsers([])
    setRoles([])
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleModalSave = () => { 
    setIsPrograming(true)
    onSubmit() 

    handleClose()
  }

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Notificación`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Notificación`}
        </Typography>

        {(id && loadingNotification) ?
            <Loader /> :
            <FormCard>   
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                name='title'
                                label='Título'
                                placeholder='Ingrese el título de la notificación'
                                type='text'
                                control={control}
                                validations={{
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    }
                                }}
                                error={errors.title}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='text'
                                label='Texto'
                                placeholder='Ingrese el texto de la notificación'
                                type='text'
                                control={control}
                                validations={{
                                    required: {
                                        value: true,
                                        message: 'El campo es requerido'
                                    }
                                }}
                                error={errors.text}
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <FormControlLabel label="Enviar por rol" control={
                                <Checkbox
                                    checked={checkedRole}
                                    onChange={handleChangeCheckedRole}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }/>
                        </Grid>

                        <UsersSelector 
                            checkedRole={checkedRole}
                            users={users}
                            roles={roles}
                            setUsers={setUsers}
                            setRoles={setRoles}
                            usersOptions={usersOptions}
                            rolesOptions={rolesOptions}
                        />

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
                                    path="/dashboard/notificaciones"
                                    defaultPadding
                                    defaultMarginRight={smUp}
                                >
                                    Volver
                                </OutlinedButton>
                            </GridStyle>

                            {!id && 
                                <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                                    <ContainedButton 
                                        defaultPadding 
                                        onClick={handleClickOpen} 
                                        loading={(!id && isPrograming) ? loadingCreateNotification : loadingEditNotification}
                                    >
                                        Programar
                                    </ContainedButton>
                                </GridStyle>
                            }

                            <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'}>
                                <ContainedButton 
                                    type='submit' 
                                    defaultPadding 
                                    loading={(!id && !isPrograming) ? loadingCreateNotification : loadingEditNotification}
                                >
                                    {!id ? 'Agregar' : 'Actualizar'}
                                </ContainedButton>
                            </GridStyle>
                        </Grid>
                    </Grid>
                </form>
            </FormCard>
        }

        <Modal 
            open={dialogOpen}
            handleClose={handleClose}
            handleSave={handleModalSave}
            title='Programar Notificación'
            closeButtonText='Cancelar'
            saveButtonText={'Programar'}
            disabledSaveButton={(!watch('date') || !watch('hour'))}
            maxWidth='xs'
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='body1'>
                        Seleccione la fecha y hora para enviar la notificación a los usuarios.
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name='date'
                        label='Fecha'
                        placeholder='Seleccione la fecha'
                        isDate
                        control={control}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name='hour'
                        label='Hora'
                        placeholder='Seleccione la hora'
                        isTime
                        control={control}
                    />
                </Grid>
            </Grid>
        </Modal>

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { CreateNotification };
