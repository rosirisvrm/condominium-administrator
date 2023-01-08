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
import { getVisits } from '../../services/visits';
import { setVisits, setLoadingVisitsList } from '../../slices/visits'

// ----------------------------------------------------------------------

function Visits() {

  // bring the fake information of the slice
  const visits = useSelector(state => state.visits.visitsList)
  console.log(visits);
  const loadingVisitsList = useSelector(state => state.visits.loadingVisitsList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchVisits = async () => {
      dispatch(setLoadingVisitsList(true))

      setTimeout(async () => {
        const res = await getVisits()
        dispatch(setVisits(res))
        dispatch(setLoadingVisitsList(false))
      }, 1000)
    }

    fetchVisits()
  }, [dispatch])

  const tableHead = [
    { id: 'reason', label: 'Motivo', alignRight: false },
    { id: 'date', label: 'Fecha', alignRight: false },
    { id: 'checkIn', label: 'Hora de llegada', alignRight: false },
    { id: 'name', label: 'Nombre del visitante', alignRight: false },
    { id: 'guestId', label: 'Cédula des visitante', alignRight: false },
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
    <Page title="Visitas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Visitas
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/empleados/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={visits} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingVisitsList}
          searchParam='reason'
          donwload={donwload}
        >
          {row => {
            const { id, reason, date, checkIn, name, guestId } = row;
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
                <TableCell align="left">{reason}</TableCell>
                <TableCell align="left">{fDate(date)}</TableCell>
                <TableCell align="left">{fTime(checkIn)}</TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" noWrap>
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{guestId}</TableCell>
                <TableCell align="right">
                  <UserMoreMenu 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/visitos/editar/${id}` ,
                      detail: `/dashboard/visitas/detalle/${id}`,
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

export { Visits };
