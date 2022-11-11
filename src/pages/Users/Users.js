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
import { getUsers } from '../../services';
import { setUsers, setLoading } from '../../actions'

// ----------------------------------------------------------------------

function Users() {

  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true))
      setTimeout(async () => {
        const resUsers = await getUsers()
        dispatch(setUsers(resUsers))
        dispatch(setLoading(false))
      }, 1000)
    }

    fetchUsers()
  }, [dispatch])

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'address', label: 'Dirección', alignRight: false },
    { id: 'subject', label: 'Teléfono', alignRight: false },
    { id: 'level', label: 'Correo', alignRight: false },
    { id: 'status', label: 'Rol', alignRight: false },
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

  const actions = ['delete', 'edit', 'detail'];

  const deleteItem = (id) => {
    console.log('eliminando item', id);
  }

  return (
    <Page title="Usuarios">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/usuarios/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={users} 
          selected={selected} 
          setSelected={setSelected}
        >
          {row => {
            const { id, name, address, email, phone, role } = row;
            const isItemSelected = selected.indexOf(name) !== -1;

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
                  <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" noWrap>
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{address}</TableCell>
                <TableCell align="left">{phone}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{role}</TableCell>
                <TableCell align="right">
                  <UserMoreMenu 
                    actions={actions} 
                    id={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/usuarios/editar/${id}` ,
                      detail: `/dashboard/usuarios/detalle/${id}`,
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

export { Users };
