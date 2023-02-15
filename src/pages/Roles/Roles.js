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
import { UserActions } from '../../sections/@dashboard/user';
//
import { getRoles } from '../../services/roles';
import { setRoles, setLoadingRolesList } from '../../slices/roles'

// ----------------------------------------------------------------------

function Roles() {

  const roles = useSelector(state => state.roles.rolesList)
  const loadingRolesList = useSelector(state => state.roles.loadingRolesList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchRoles = async () => {
      dispatch(setLoadingRolesList(true))

      setTimeout(async () => {
        const res = await getRoles()
        dispatch(setRoles(res))
        dispatch(setLoadingRolesList(false))
      }, 1000)
    }

    fetchRoles()
  }, [dispatch])

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    // { id: 'description', label: 'Descripción', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'numberOfUsers', label: 'Cantidad de Usuarios', alignRight: false },
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
    <Page title="Roles">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
          <Typography variant="h4" gutterBottom>
            Roles
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/roles/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={roles} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingRolesList}
          searchParam='name'
          donwload={donwload}
        >
          {row => {
            const { id, name, status, numberOfUsers } = row;
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
                {/* <TableCell align="left">{description}</TableCell> */}
                <TableCell align="left">{status.label}</TableCell>
                <TableCell align="left">{numberOfUsers}</TableCell>
                <TableCell align="left">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/roles/editar/${id}` ,
                      detail: `/dashboard/roles/detalle/${id}`,
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

export { Roles };
