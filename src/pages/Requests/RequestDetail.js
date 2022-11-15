import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
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

  const request = useSelector(state => state.requests.request)
  const loadingRequest = useSelector(state => state.requests.loadingRequest)
  const loadingEditRequest = useSelector(state => state.requests.loadingEditRequest)
  const statusOptions = useSelector(state => state.requests.statusOptions)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchRequest = async () => {
      dispatch(setLoadingRequest(true))
      
      setTimeout(async () => {
        const res = await getRequest(id)
        dispatch(setRequest(res))
        setFormValues(res)
        dispatch(setLoadingRequest(false))
      }, 1000)
    }

    const fetchStatusOptions = async () => {
      const res = await getStatusOptions()
      dispatch(setStatusOptions (res))
    }

    fetchRequest()
    fetchStatusOptions()
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [status, setStatus] = React.useState(0)
  const [newComment, setNewComment] = React.useState('')

  const [loadingComment, setLoadingComment] = React.useState(false)
  
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const setFormValues = (request) =>{
    setStatus(request?.status ? request.status.value : '')
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(setLoadingEditRequest(true))

    console.log('submit');
    console.log('form values: ', status);
    console.log(request);

    const body = {
      status
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
    console.log('post comment');
    setLoadingComment(false)
    setOpen(true);
    setColor('success')
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
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input 
                    label='Usuario'
                    inputValue={request?.user || ''}
                    disabled
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Dirección'
                    inputValue={request?.userAddress || ''}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input 
                    label='Asunto'
                    inputValue={request?.subject || ''}
                    disabled
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Nivel'
                    inputValue={request?.level ? request.level.label : ''}
                    disabled
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Descripción'
                    inputValue={request?.description || ''}
                    multiline
                    rows={3}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Status'
                    inputValue={status}
                    setInputValue={setStatus}
                    isSelect
                    selectOptions={statusOptions}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1}>
                {request?.comments.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Input 
                      label={index === 0 && 'Comentarios'}
                      inputValue={item.content}
                      multiline
                      rows={2}
                      disabled
                      helperText={`${item.user} ${item.date} ${item.time}`}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Input
                    label={(request?.comments.length === 0 )&& 'Comentarios'}
                    placeholder='Ingrese un comentario'
                    inputValue={newComment}
                    setInputValue={setNewComment}
                    multiline
                    rows={2}
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
