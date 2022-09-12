import React from 'react';
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

function RequestDetail() {

  const [status, setStatus] = React.useState(0)
  const [newComment, setNewComment] = React.useState('')

  const request = {
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
  }

  const sendComment = () => {
    console.log('add comment');
  }

  return (
    <Page title="Detalle de Solicitud o Sugerencia">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
            Detalle de Solicitud o Sugerencia
        </Typography>

        <FormCard>   
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                   <Input 
                    label='Usuario'
                    inputValue={request.user}
                    disabled
                   />
                </Grid>

                <Grid item xs={6}>
                  <Input 
                    label='Dirección'
                    inputValue={request.userAddress}
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                   <Input 
                    label='Asunto'
                    inputValue={request.subject}
                    disabled
                   />
                </Grid>

                <Grid item xs={6}>
                  <Input 
                    label='Nivel'
                    inputValue={request.level}
                    disabled
                  />
                </Grid>
              </Grid>
              
              <Grid container item spacing={12}>
                <Grid item xs={6}>
                  <Input 
                    label='Descripción'
                    inputValue={request.description}
                    multiline
                    rows={3}
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
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
                  <OutlinedButton size='small' onClick={sendComment}>
                    Enviar comentario
                  </OutlinedButton>
                </Grid>
              </Grid>

              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                mt={8}
              >
                <OutlinedButton 
                  isRouterLink 
                  path="/dashboard/solicitudes-sugerencias"
                  defaultPadding
                  defaultMarginRight 
                >
                  Volver
                </OutlinedButton>

                <ContainedButton type='submit'>
                  Actualizar
                </ContainedButton>
              </Grid>

            </Grid>
          </form>
        </FormCard>
      </Container>
    </Page>
  );
}

export { RequestDetail };
