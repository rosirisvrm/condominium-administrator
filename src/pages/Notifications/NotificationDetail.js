import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader';
import { BasicTable } from '../../components/BasicTable';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getNotification } from '../../services/notifications';
// slices
import { setLoadingNotification, setNotification } from '../../slices/notifications';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function NotificationDetail() {

  const { id } = useParams()

  const notification = useSelector(state => state.notifications.notification)
  const loadingNotification = useSelector(state => state.notifications.loadingNotification)

  const dispatch = useDispatch()

  const [users, setUsers] = React.useState([])
  const headersUsers = ['Usuario', 'Dirección'];

  const { control, setValue } = useForm({
    defaultValues: {
        title: '',
        text: '',
        date: new Date(),
        hour: new Date(),
        author: '',
    }
  });

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  let spacing = 2;
  if(smUp) spacing = 6;
  if(mdUp) spacing = 12;

  useEffect(() => {
    if(id){
        const fetchNotification = async () => {
            dispatch(setLoadingNotification(true))
            
            setTimeout(async ()=> {
                const res = await getNotification(id)
                dispatch(setNotification(res))
                setFormValues()
                dispatch(setLoadingNotification(false))
            }, 1000)
        }

        fetchNotification()
    }
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

  const setStatusColor = () => {
    if(notification?.status?.value === 0){
      return 'warning';
    }

    return 'success';
  }

  return (
    <Page title='Detalle de Notificación'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Notificación
        </Typography>

        {(id && loadingNotification) ?
            <Loader /> :
            <FormCard>   
                <form>
                    <Grid container spacing={2}>
                        <Grid item container direction="row" justifyContent="flex-end" alignItems="center">
                            <Label variant="ghost" color={setStatusColor()} sx={{ py: 2, px: 5 }}>
                                {notification?.status?.label || ''}
                            </Label>
                        </Grid>

                        <Grid xs={12} item>
                            <Input
                                name='title'
                                label='Título'
                                disabled
                                type='text'
                                control={control}
                            />
                        </Grid>

                        <Grid xs={12} item>
                            <Input
                                name='text'
                                label='Texto'
                                disabled
                                type='text'
                                control={control}
                            />
                        </Grid>
                        
                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='date'
                                    label='Fecha de envío'
                                    disabled
                                    isDate
                                    control={control}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='hour'
                                    label='Hora de envío'
                                    disabled
                                    isTime
                                    control={control}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={spacing}>
                            <Grid item xs={12} sm={6}>
                                <Input
                                    name='author'
                                    label='Creada por'
                                    disabled
                                    type='text'
                                    control={control}
                                />
                            </Grid>
                        </Grid>

                        {users.length > 0 && 
                            <>
                                <Grid xs={12} item>
                                    <Typography variant='h6'>
                                        Usuarios
                                    </Typography>
                                </Grid>

                                <Grid xs={12} item>
                                    <BasicTable
                                        mt={0}
                                        headers={headersUsers} 
                                        elements={users} 
                                        caption={`La notificación 
                                            ${notification.status.value === 0 ? 'será' : 'fue'} 
                                            enviada a un total de 
                                            ${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}
                                        `}
                                    >
                                        {(row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row?.name}</TableCell>
                                            <TableCell>{row?.address}</TableCell>
                                        </TableRow>
                                        )}
                                    </BasicTable>   
                                </Grid>        
                            </>
                        }

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
                        </Grid>
                    </Grid>
                </form>
            </FormCard>
        }
      </Container>
    </Page>
  );
}

export { NotificationDetail };
