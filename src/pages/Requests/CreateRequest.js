import React from 'react';
import { useParams } from 'react-router-dom'
// @mui
import { Container, Typography, Grid } from '@mui/material';
// components
import Page from '../../components/Page';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { ContainedButton } from '../../components/ContainedButton';
import { CustomSnackbar } from '../../components/CustomSnackbar';

// ----------------------------------------------------------------------


function CreateRequest() {

  const { id } = useParams()
  
  const [subject, setSubject] = React.useState('')
  const [level, setLevel] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [comment, setComment] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [color, setColor] = React.useState('')

  const levelOptions = [
    { label: 'Alta', value: 0 },
    { label: 'Media', value: 1 },
    { label: 'Baja', value: 2 }
  ]

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    console.log(subject, level, description, comment);
    setLoading(false)
    setColor('success')
    setOpen(true);
  }

  return (
    <Page title={`${!id ? 'Crear' : 'Editar'} Solicitud o Sugerencia`}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          {`${!id ? 'Crear' : 'Editar'} Solicitud o Sugerencia`}
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
                <OutlinedButton 
                  isRouterLink 
                  path="/dashboard/solicitudes-sugerencias" 
                  defaultMarginRight 
                  defaultPadding
                >
                  Volver
                </OutlinedButton>

                <ContainedButton type='submit' defaultPadding loading={loading}>
                  Agregar
                </ContainedButton>
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

export { CreateRequest };
