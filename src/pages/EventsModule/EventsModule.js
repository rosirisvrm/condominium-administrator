import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { CustomTable } from '../../components/CustomTable';
import { UserMoreMenu } from '../../sections/@dashboard/user';
import { fDate, fTime } from '../../utils/formatTime';
//
import { getEventsModule } from '../../services/eventsModule';
import { setEventsModule, setLoadingEventsModuleList } from '../../slices/eventsModule'

// ----------------------------------------------------------------------

function EventsModule() {

  // bring the fake information of the slice
  const eventsModule = useSelector(state => state.eventsModule.eventsModuleList)
  console.log(eventsModule);
  const loadingEventsModuleList = useSelector(state => state.eventsModule.loadingEventsModuleList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchEventsModule = async () => {
      dispatch(setLoadingEventsModuleList(true))

      setTimeout(async () => {
        const res = await getEventsModule()
        dispatch(setEventsModule(res))
        dispatch(setLoadingEventsModuleList(false))
      }, 1000)
    }

    fetchEventsModule()
  }, [dispatch])

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'date', label: 'Fecha', alignRight: false },
    { id: 'checkIn', label: 'Hora de llegada', alignRight: false },
    { id: 'place', label: 'Lugar', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([]);

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    console.log('eliminando item', id);
  }

  const donwload = () => {
    console.log('descargando');
  }

  return (
    <Page title="Eventos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Eventos
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/empleados/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={eventsModule} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingEventsModuleList}
          searchParam='name'
          donwload={donwload}
        >
          {row => {
            const { id, name, date, checkIn, place } = row;
            const isItemSelected = selected.indexOf(id) !== -1;

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
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{fDate(date)}</TableCell>
                <TableCell align="left">{fTime(checkIn)}</TableCell>
                <TableCell align="left">{place}</TableCell>
                <TableCell align="right">
                  <UserMoreMenu 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/eventos/editar/${id}` ,
                      detail: `/dashboard/eventos/detalle/${id}`,
                    }} 
                  />
                </TableCell>
              </TableRow>
            );
          }}
        </CustomTable>

      </Container>
    </Page>
  );
}

export { EventsModule };
