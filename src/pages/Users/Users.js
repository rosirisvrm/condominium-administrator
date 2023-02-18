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
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { UserActions } from '../../sections/@dashboard/user';
//
import { getUsers, deleteUser, downloadUser } from '../../services/users';
import { setUsers, setLoadingUsersList, setLoadingDeleteUser, setLoadingDownloadUser } from '../../slices/usersSlice'

// ----------------------------------------------------------------------

function Users() {

  const users = useSelector(state => state.users.usersList)
  const loadingUsersList = useSelector(state => state.users.loadingUsersList)
  const loadingDeleteUser = useSelector(state => state.users.loadingDeleteUser)
  const loadingDownloadUser = useSelector(state => state.users.loadingDownloadUser)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'address', label: 'Dirección', alignRight: false },
    { id: 'subject', label: 'Teléfono', alignRight: false },
    { id: 'level', label: 'Correo', alignRight: false },
    { id: 'status', label: 'Rol', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [reload, setReload] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoadingUsersList(true))

      setTimeout(async () => {
        const res = await getUsers()
        dispatch(setUsers(res))
        dispatch(setLoadingUsersList(false))
      }, 1000)
    }

    fetchUsers()
  }, [dispatch, reload])

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
    dispatch(setLoadingDeleteUser(true))

    setTimeout(async () => {
      const res = await deleteUser(id)
      dispatch(setLoadingDeleteUser(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadUser(true))

    setTimeout(async () => {
      await downloadUser()
      dispatch(setLoadingDownloadUser(false))
    }, [2000])
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
          loading={loadingUsersList}
          searchParam='name'
          download={download}
          loadingDownload={loadingDownloadUser}
        >
          {row => {
            const { id, name, address, email, phone, role } = row;
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
                <TableCell align="left">{address}</TableCell>
                <TableCell align="left">{phone}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{role}</TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem}
                    loadingDelete={loadingDeleteUser}
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

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { Users };
