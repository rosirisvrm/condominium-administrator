import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sentenceCase } from 'change-case';
// material
import {
  Stack,
  Checkbox,
  TableRow,
  TableCell,
  Container,
  Typography,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
import { CustomTable } from '../../components/CustomTable';
//
import { getInvoices, downloadInvoicesList, downloadInvoice } from '../../services/accounting';
import { 
  setInvoices, 
  setLoadingInvoicesList, 
  setLoadingDownloadInvoicesList, 
  setLoadingDownloadInvoice
} from '../../slices/accountingSlice'

// ----------------------------------------------------------------------

function Invoices() {

  const invoicesList = useSelector(state => state.accounting.invoicesList)
  const loadingInvoicesList = useSelector(state => state.accounting.loadingInvoicesList)
  const loadingDownloadInvoicesList = useSelector(state => state.accounting.loadingDownloadInvoicesList)
  const loadingDownloadInvoice = useSelector(state => state.accounting.loadingDownloadInvoice)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'subject', label: 'Asunto de Pago', alignRight: false },
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'state', label: 'Estado de Pago', alignRight: false },
    { id: 'invoiceNumber', label: 'Número de Factura', alignRight: false },
    { id: 'id', label: 'Descargar Factura' },
  ]

  const [selected, setSelected] = useState([])
  const [idInvoice, setIdInvoice] = useState()

  useEffect(() => {
    const fetchIncome = async () => {
      dispatch(setLoadingInvoicesList(true))

      setTimeout(async () => {
        const res = await getInvoices()
        dispatch(setInvoices(res))
        dispatch(setLoadingInvoicesList(false))
      }, 2000)
    }

    fetchIncome()
  }, [dispatch])

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

  const download = () => {
    dispatch(setLoadingDownloadInvoicesList(true))

    setTimeout(async () => {
      await downloadInvoicesList()
      dispatch(setLoadingDownloadInvoicesList(false))
    }, [2000])
  }

  const downloadItem = (id) => {
    setIdInvoice(id)
    dispatch(setLoadingDownloadInvoice(true))

    setTimeout(async () => {
      await downloadInvoice(id)
      dispatch(setLoadingDownloadInvoice(false))
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
    <Page title="Facturas y Recibos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Facturas y Recibos
          </Typography>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={invoicesList} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingInvoicesList}
          searchParam='subject'
          download={download}
          loadingDownload={loadingDownloadInvoicesList}
        >
          {row => {
            const { id, subject, name, status, invoiceNumber } = row;
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
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">
                  <Label variant="ghost" color={color}>
                    {sentenceCase(status.label)}
                  </Label>
                </TableCell>
                <TableCell align="left">{invoiceNumber}</TableCell>
                <TableCell align="left">
                  {(loadingDownloadInvoice && idInvoice === id) ? 
                    <CircularProgress size={24} /> :
                    <Tooltip title='Descargar'>
                      <IconButton onClick={() => downloadItem(id)} color='primary'>
                        <Iconify icon='material-symbols:sim-card-download' width={20} height={20} />
                      </IconButton>
                    </Tooltip>
                  }
                </TableCell>
              </TableRow>
            );
          }}
        </CustomTable>

      </Container>
    </Page>
  );
}

export { Invoices };