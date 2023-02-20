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
import { CustomSnackbar } from '../../components/CustomSnackbar';
import { UserActions } from '../../sections/@dashboard/user';
//
import { getRoles, deleteRole, downloadRole } from '../../services/roles';
import { setRoles, setLoadingRolesList, setLoadingDeleteRole, setLoadingDownloadRole } from '../../slices/roles';

// ----------------------------------------------------------------------

function Roles() {

  const roles = useSelector(state => state.roles.rolesList)
  const loadingRolesList = useSelector(state => state.roles.loadingRolesList)
  const loadingDeleteRole = useSelector(state => state.roles.loadingDeleteRole)
  const loadingDownloadRole = useSelector(state => state.roles.loadingDownloadRole)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'numberOfUsers', label: 'Cantidad de Usuarios', alignRight: false },
    { id: '' },
  ]

  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [reload, setReload] = useState('')

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
  }, [dispatch, reload])

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
    dispatch(setLoadingDeleteRole(true))

    setTimeout(async () => {
      const res = await deleteRole(id)
      dispatch(setLoadingDeleteRole(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadRole(true))

    setTimeout(async() => {
      await downloadRole()
      dispatch(setLoadingDownloadRole(false))
    }, [2000])
  }

  const getStatusColor = (status) => {
    if(status?.value === 0){
        return 'success';
    }
    
    return 'warning';
  }

  const bulkDelete = () => {
    if(selected.length > 1){
      dispatch(setLoadingDeleteRole(true))

      const promises = selected.map(idSelected => deleteRole(idSelected))

      setTimeout(async () => {
        let isError = false;

        await Promise.allSettled(promises)
          .then((results) => results.forEach((result) => {
            console.log(result)
            
            if(result?.status !== 'fulfilled'){
              isError = true
            }
          }));
        
        dispatch(setLoadingDeleteRole(false))

        setColor(isError ? 'error' : 'success')
        setOpen(true)
        setReload(prev => !prev)
        setSelected([])
      }, 2000)
    }
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
          download={download}
          loadingDownload={loadingDownloadRole}
          bulkDelete={bulkDelete}
          loadingBulkDelete={loadingDeleteRole}
        >
          {row => {
            const { id, name, status, numberOfUsers } = row;
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
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Label variant="ghost" color={color}>
                    {sentenceCase(status.label)}
                  </Label>
                </TableCell>
                <TableCell align="left">{numberOfUsers}</TableCell>
                <TableCell align="left">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem}
                    loadingDelete={loadingDeleteRole}
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

        <CustomSnackbar
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />
      </Container>
    </Page>
  );
}

export { Roles };
