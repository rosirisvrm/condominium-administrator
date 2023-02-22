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
import { getEmployees, deleteEmployee, downloadEmployee } from '../../services/employees';
import { setEmployees, setLoadingEmployeesList, setLoadingDeleteEmployee, setLoadingDownloadEmployee } from '../../slices/employees'

// ----------------------------------------------------------------------

function Employees() {

  const employees = useSelector(state => state.employees.employeesList)
  const loadingEmployeesList = useSelector(state => state.employees.loadingEmployeesList)
  const loadingDeleteEmployee = useSelector(state => state.employees.loadingDeleteEmployee)
  const loadingDownloadEmployee = useSelector(state => state.employees.loadingDownloadEmployee)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'identification', label: 'Cédula', alignRight: false },
    { id: 'phone', label: 'Teléfono', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'position', label: 'Cargo', alignRight: false },
    { id: '' },
  ]

  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [reload, setReload] = useState('')

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(setLoadingEmployeesList(true))

      setTimeout(async () => {
        const res = await getEmployees(8)
        dispatch(setEmployees(res))
        dispatch(setLoadingEmployeesList(false))
      }, 1000)
    }

    fetchEmployees()
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
    dispatch(setLoadingDeleteEmployee(true))

    setTimeout(async () => {
      const res = await deleteEmployee(id)
      dispatch(setLoadingDeleteEmployee(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadEmployee(true))

    setTimeout(async () => {
      await downloadEmployee()
      dispatch(setLoadingDownloadEmployee(false))
    }, [2000])
  }

  const bulkDelete = () => {
    if(selected.length > 1){
      dispatch(setLoadingDeleteEmployee(true))

      const promises = selected.map(idSelected => deleteEmployee(idSelected))

      setTimeout(async () => {
        let isError = false;

        await Promise.allSettled(promises)
          .then((results) => results.forEach((result) => {
            console.log(result)
            
            if(result?.status !== 'fulfilled'){
              isError = true
            }
          }));
        
        dispatch(setLoadingDeleteEmployee(false))

        setColor(isError ? 'error' : 'success')
        setOpen(true)
        setReload(prev => !prev)
        setSelected([])
      }, 2000)
    }
  }

  return (
    <Page title="Empleados">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Empleados
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/empleados/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={employees} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingEmployeesList}
          searchParam='name'
          download={download}
          loadingDownload={loadingDownloadEmployee}
          bulkDelete={bulkDelete}
          loadingBulkDelete={loadingDeleteEmployee}
        >
          {row => {
            const { id, name, email, phone, position, identification } = row;
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
                <TableCell align="left">{identification}</TableCell>
                <TableCell align="left">{phone}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{position}</TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem}
                    loadingDelete={loadingDeleteEmployee}
                    actionsRedirect={{
                      edit: `/dashboard/empleados/editar/${id}` ,
                      detail: `/dashboard/empleados/detalle/${id}`,
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

export { Employees };
