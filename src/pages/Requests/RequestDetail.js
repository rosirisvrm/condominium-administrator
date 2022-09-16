import React from 'react';
import { useParams } from 'react-router-dom'
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
//
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------


function RequestDetail() {

  const { id } = useParams()

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [status, setStatus] = React.useState(0)
  const [newComment, setNewComment] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loadingComment, setLoadingComment] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const request = {
    id,
    user: 'Ann Bode',
    userAddress: 'C-2-3',
    subject: 'Reserva de área común',
    level: 'Alta',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    status: 'Pendiente',
    comments: [
      { 
        user: 'Administrador', 
        date: '09-09-2022',
        time: '18:02', 
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.' 
      }
    ]
  }

  const statusOptions = [
    { label: 'Pendiente', value: 0 },
    { label: 'Aprobada', value: 1 },
    { label: 'Rechazada', value: 2 }
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    console.log(request);
    setLoading(false)
    setColor('success')
    setOpen(true);
  }

  const sendComment = () => {
    console.log('add comment');
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

        <FormCard>   
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input 
                    label='Usuario'
                    inputValue={request.user}
                    disabled
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Dirección'
                    inputValue={request.userAddress}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                   <Input 
                    label='Asunto'
                    inputValue={request.subject}
                    disabled
                   />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Nivel'
                    inputValue={request.level}
                    disabled
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={spacing}>
                <Grid item xs={12} sm={6}>
                  <Input 
                    label='Descripción'
                    inputValue={request.description}
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
                {request.comments.map((item, index) => (
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
                    placeholder='Agregar un comentario'
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
                  <ContainedButton type='submit' defaultPadding loading={loading}>
                    Actualizar
                  </ContainedButton>
                </GridStyle>
              </Grid>

            </Grid>
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

export { RequestDetail };
