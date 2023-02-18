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
import { CustomSnackbar } from '../../components/CustomSnackbar';
//
import { getProviders, deleteProvider, downloadProvider } from '../../services/providers';
import { setProviders, setLoadingProvidersList, setLoadingDeleteProvider, setLoadingDownloadProvider } from '../../slices/providers'

// ----------------------------------------------------------------------

function Providers() {

  const providers = useSelector(state => state.providers.providersList)
  const loadingProvidersList = useSelector(state => state.providers.loadingProvidersList)
  const loadingDeleteProvider = useSelector(state => state.providers.loadingDeleteProvider) 
  const loadingDownloadProvider = useSelector(state => state.providers.loadingDownloadProvider) 
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'companyName', label: 'Compañía', alignRight: false },
    { id: 'product', label: 'Producto', alignRight: false },
    { id: 'phone', label: 'Teléfono', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [reload, setReload] = useState('')

  useEffect(() => {
    const fetchProviders = async () => {
      dispatch(setLoadingProvidersList(true))

      setTimeout(async () => {
        const res = await getProviders()
        dispatch(setProviders(res))
        dispatch(setLoadingProvidersList(false))
      }, 1000)
    }

    fetchProviders()
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
    dispatch(setLoadingDeleteProvider(true))

    setTimeout(async () => {
      const res = await deleteProvider(id)
      dispatch(setLoadingDeleteProvider(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadProvider(true))

    setTimeout(async() => {
      await downloadProvider()
      dispatch(setLoadingDownloadProvider(false))
    }, [2000])
  }

  return (
    <Page title="Proveedores">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Proveedores
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/proveedores/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={providers} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingProvidersList}
          searchParam='companyName'
          download={download}
          loadingDownload={loadingDownloadProvider}
        >
          {row => {
            const { id, companyName, email, phone, product } = row;
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
                    {companyName}
                  </Typography>
                </TableCell>
                <TableCell align="left">{product}</TableCell>
                <TableCell align="left">{phone}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem}
                    loadingDelete={loadingDeleteProvider}
                    actionsRedirect={{
                      edit: `/dashboard/proveedores/editar/${id}` ,
                      detail: `/dashboard/proveedores/detalle/${id}`,
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

export { Providers };
