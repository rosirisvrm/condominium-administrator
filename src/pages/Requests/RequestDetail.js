import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
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
import { Loader } from '../../components/Loader';
//
import useResponsive from '../../hooks/useResponsive';
import { getRequest, getStatusOptions, putRequest } from '../../services/requests';
import { setRequest, setLoadingRequest, setLoadingEditRequest, setStatusOptions } from '../../slices/requestsSlice';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function RequestDetail() {

  const { id } = useParams()

  const user = useSelector(state => state.auth.user)
  const request = useSelector(state => state.requests.request)
  const loadingRequest = useSelector(state => state.requests.loadingRequest)
  const loadingEditRequest = useSelector(state => state.requests.loadingEditRequest)
  const statusOptions = useSelector(state => state.requests.statusOptions)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm({ 
    defaultValues: {
      subject: '',
      level: '',
      description: '',
      status: '',
      newComment: '',
    }
  });

  useEffect(() => {
    const fetchRequest = async () => {
      dispatch(setLoadingRequest(true))
      
      setTimeout(async () => {
        const res = await getRequest(id)
        dispatch(setRequest(res))
        setFormValues()
        dispatch(setLoadingRequest(false))
      }, 1000)
    }

    const fetchStatusOptions = async () => {
      const res = await getStatusOptions()
      dispatch(setStatusOptions(res))
    }

    fetchRequest()
    fetchStatusOptions()
  }, [dispatch, id])

  const setFormValues = () => {
    setValue('subject', request?.subject || '')
    setValue('level', request?.level ? request.level.label : '')
    setValue('description', request?.description || '')
    setValue('status', request?.status ? request.status.value : '')
    setValue('user', request?.user || '')
    setValue('userAddress', request?.userAddress || '')

    if(request?.comments.length > 0){
      request.comments.forEach((comment, index)  => {
        setValue(`comment ${index}`, comment?.content || '')
      })
    }
  }

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [loadingComment, setLoadingComment] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')
  
  const onSubmit = (event) => {
    dispatch(setLoadingEditRequest(true))

    console.log('submit');
    console.log('event ', event);
    console.log('request', request);

    const body = {
      ...event,
    }

    setTimeout(() => {
      const editRequest = async() => {
        const res = await putRequest(id, body)

        dispatch(setLoadingEditRequest(false))
        setColor(res ? 'success' : 'error')
        setOpen(true);
  
        if(res){
          setTimeout(() => {
            navigate('/dashboard/solicitudes-sugerencias')
          }, 2000)
        }
      }

      editRequest()
    }, 1000)
  }

  const sendComment = () => {
    setLoadingComment(true)
    console.log('send comment');

    const newComment = getValues('newComment');
    console.log('newComment ', newComment);

    setTimeout(() => {
      setLoadingComment(false)
      setOpen(true);
      setColor('success')
    }, 2000)
  }

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  return (
    <Page title="Detalle de Solicitud o Sugerencia">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
            Detalle de Solicitud o Sugerencia
        </Typography>


        {loadingRequest ? 
        <Loader /> :
        <FormCard>   
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>

              {/* If admin */}
              {(user.role.value === 2) && 
                <Grid container item spacing={spacing}>
                  <Grid item xs={12} sm={6}>
                    <Input
                      name='user'
                      label='Usuario'
                      type='text'
                      disabled
                      control={control}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Input
                      name='userAddress'
                      label='Dirección'
                      type='text'
                      disabled
                      control={control}
                    />
                  </Grid>
                </Grid>
              }

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input
                    name='subject'
                    label='Asunto'
                    disabled
                    type='text'
                    control={control}
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input
                    name='level'
                    label='Nivel'
                    disabled
                    text='text'
                    control={control}
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='description'
                    label='Descripción'
                    disabled
                    type='text'
                    multiline
                    rows={3}
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input
                    name='status'
                    label='Status'
                    disabled={user.role.value === 0}
                    isSelect
                    selectOptions={statusOptions}
                    control={control}
                    validations={{
                      required: {
                        value: true,
                        message: 'El campo es requerido'
                      }
                    }}
                    error={errors.status}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                {request?.comments.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Input
                      name={`comment ${index}`}
                      label={(index === 0) && 'Comentarios'}
                      multiline
                      rows={2}
                      disabled
                      helperText={`${item.user} ${item.date} ${item.time}`}
                      type='text'
                      control={control}
                      error={errors[`comment ${index}`]}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Input
                    name='newComment'
                    label={(request?.comments.length === 0) && 'Comentarios'}
                    placeholder='Ingrese un comentario'
                    multiline
                    rows={2}
                    type='text'
                    control={control}
                    error={errors.newComment}
                  />
                </Grid>

                <Grid  
                  container
                  item
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <OutlinedButton size='small' onClick={sendComment} loading={loadingComment}>
                    Enviar comentario
                  </OutlinedButton>
                </Grid>
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
                  <ContainedButton type='submit' defaultPadding loading={loadingEditRequest}>
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

export { RequestDetail };
