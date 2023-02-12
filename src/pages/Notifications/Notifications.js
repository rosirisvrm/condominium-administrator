import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sentenceCase } from 'change-case';
// material
import {
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableCell,
  Container,
  Typography,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import { CustomTable } from '../../components/CustomTable';
import { UserActions } from '../../sections/@dashboard/user';
import { CustomSnackbar } from '../../components/CustomSnackbar';
//
import { fDateTime } from '../../utils/formatTime';
import { getNotificationsList, deleteNotification } from '../../services/notifications';
import { setNotificationsList, setLoadingNotificationsList, setLoadingDeleteNotification } from '../../slices/notifications'

// ----------------------------------------------------------------------

function Notifications() {

  const notifications = useSelector(state => state.notifications.notificationsList)
  const loadingNotificationsList = useSelector(state => state.notifications.loadingNotificationsList)
  
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')

  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(setLoadingNotificationsList(true))

      setTimeout(async () => {
        const res = await getNotificationsList()
        dispatch(setNotificationsList(res))
        dispatch(setLoadingNotificationsList(false))
      }, 1000)
    }

    fetchNotifications()
  }, [dispatch])

  const tableHead = [
    { id: 'title', label: 'Título', alignRight: false },
    { id: 'author', label: 'Creada por', alignRight: false },
    { id: 'date', label: 'Fecha y hora de envío', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const deleteItem = (id) => {
    dispatch(setLoadingDeleteNotification(true))

    setTimeout(async () => {
        const res = await deleteNotification(id)

        setColor(res ? 'success' : 'error')
        setOpen(true)
        dispatch(setLoadingDeleteNotification(false))
    }, 1000)
  }

  const download = () => {
    console.log('descargando');
  }

  const getStatusColor = (status) => {
    if(status?.label === 'Programada'){
        return 'warning';
    }
    
    return 'success';
  }

  return (
    <Page title="Notificaciones">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Notificaciones
          </Typography>
          <Button 
            variant="contained" 
            component={RouterLink} 
            to="/dashboard/notificaciones/crear" 
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={notifications} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingNotificationsList}
          searchParam='title'
          download={download}
        >
          {row => {
            const { id, title, author, date, status } = row;
            const isItemSelected = selected.indexOf(id) !== -1;
            const color = getStatusColor(status);

            return (
              <TableRow
                hover
                key={id}
                tabIndex={-1}
                role="checkbox"
                selected={isItemSelected}
                aria-checked={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" noWrap>
                    {title}
                  </Typography>
                </TableCell>
                <TableCell align="left">{author?.name || ''}</TableCell>
                <TableCell align="left">{date ? fDateTime(date) : ''}</TableCell>
                <TableCell align="left">
                    <Label variant="ghost" color={color}>
                        {sentenceCase(status.label)}
                    </Label>
                </TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/notificaciones/editar/${id}` ,
                      detail: `/dashboard/notificaciones/detalle/${id}`,
                    }} 
                  />
                </TableCell>
              </TableRow>
            );
          }}
        </CustomTable>

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { Notifications };
