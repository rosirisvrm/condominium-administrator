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
import { fDate } from '../../utils/formatTime';
import { getExpenses, deletePayment, downloadPayment } from '../../services/accounting';
import { setExpenses, setLoadingExpensesList, setLoadingDeletePayment, setLoadingDownloadPayment } from '../../slices/accountingSlice'

// ----------------------------------------------------------------------

function Expenses() {

  const expensesList = useSelector(state => state.accounting.expensesList)
  const loadingExpensesList = useSelector(state => state.accounting.loadingExpensesList)
  const loadingDeletePayment = useSelector(state => state.accounting.loadingDeletePayment)
  const loadingDownloadPayment = useSelector(state => state.accounting.loadingDownloadPayment)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'subject', label: 'Asunto', alignRight: false },
    { id: 'amount', label: 'Monto (USD)', alignRight: false },
    { id: 'reference', label: 'Reference', alignRight: false },
    { id: 'date', label: 'Fecha', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('')
  const [reload, setReload] = useState('')

  useEffect(() => {
    const fetchExpenses = async () => {
      dispatch(setLoadingExpensesList(true))

      setTimeout(async () => {
        const res = await getExpenses()
        dispatch(setExpenses(res))
        dispatch(setLoadingExpensesList(false))
      }, 1000)
    }

    fetchExpenses()
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
    dispatch(setLoadingDeletePayment(true))

    setTimeout(async () => {
      const res = await deletePayment(id)
      dispatch(setLoadingDeletePayment(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadPayment(true))

    setTimeout(async () => {
      await downloadPayment()
      dispatch(setLoadingDownloadPayment(false))
    }, [2000])
  }

  const getStatusColor = (status) => {
    if(status?.value === 0){
        return 'warning';
    }

    if(status?.value === 1){
      return 'success';
    }
    
    return 'error';
  }

  return (
    <Page title="Egresos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Egresos
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/contabilidad/crear-pago" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={expensesList} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingExpensesList}
          searchParam='subject'
          download={download}
          loadingDownload={loadingDownloadPayment}
        >
          {row => {
            const { id, subject, amount, reference, date, status } = row;
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
                    {subject}
                  </Typography>
                </TableCell>
                <TableCell align="left">{amount}</TableCell>
                <TableCell align="left">{reference}</TableCell>
                <TableCell align="left">{fDate(date)}</TableCell>
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
                    loadingDelete={loadingDeletePayment} 
                    actionsRedirect={{
                      edit: `/dashboard/contabilidad/editar-pago/${id}` ,
                      detail: `/dashboard/contabilidad/detalle-egreso/${id}`,
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

export { Expenses };
