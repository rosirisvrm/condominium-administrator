import React from 'react';
// @mui
import { Container, Typography, Grid } from '@mui/material';
// import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

function CreateRequest() {
  
  const [subject, setSubject] = React.useState('')
  const [level, setLevel] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [comment, setComment] = React.useState('')

  const levelOptions = [
    { label: 'Alta', value: 0 },
    { label: 'Media', value: 1 },
    { label: 'Baja', value: 2 }
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    console.log(subject, level, description, comment);
  }

  return (
    <Page title="Crear Solicitud o Sugerencia">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Crear Solicitud o Sugerencia
        </Typography>

        <FormCard>   
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>

              <Grid container item spacing={12}>
                <Grid item xs={6}>
                   <Input 
                    label='Asunto'
                    placeholder='Ingrese un asunto'
                    inputValue={subject}
                    setInputValue={setSubject}
                   />
                </Grid>

                <Grid item xs={6}>
                  <Input 
                    label='Nivel'
                    placeholder='Seleccione un nivel'
                    inputValue={level}
                    setInputValue={setLevel}
                    isSelect
                    selectOptions={levelOptions}
                  />
                </Grid>
              </Grid>
              
              <Grid item xs={12}>
                <Input 
                  label='Descripción'
                  placeholder='Ingrese una descripción'
                  inputValue={description}
                  setInputValue={setDescription}
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <Input 
                  label='Comentarios'
                  placeholder='Ingrese un comentario'
                  inputValue={comment}
                  setInputValue={setComment}
                  multiline
                />
              </Grid>

              <Grid
                container
                item
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                mt={8}
              >
                <OutlinedButton isRouterLink path="/dashboard/solicitudes-sugerencias">
                  Volver
                </OutlinedButton>

                <ContainedButton type='submit'>
                  Agregar
                </ContainedButton>
              </Grid>

            </Grid>
          </form>
        </FormCard>
      </Container>
    </Page>
  );
}

export { CreateRequest };
