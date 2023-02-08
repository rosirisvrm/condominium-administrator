import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Stack,
  Checkbox,
  TableRow,
  TableCell,
  Container,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
// components
import Page from '../../components/Page';
import { CustomTable } from '../../components/CustomTable';
import Iconify from '../../components/Iconify';
//
import { getInvoices } from '../../services/accounting';
import { setInvoices, setLoadingInvoicesList } from '../../slices/accountingSlice'

// ----------------------------------------------------------------------

function Invoices() {

  const invoicesList = useSelector(state => state.accounting.invoicesList)
  const loadingInvoiceList = useSelector(state => state.accounting.loadingInvoiceList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchIncome = async () => {
      dispatch(setLoadingInvoicesList(true))

      setTimeout(async () => {
        const res = await getInvoices()
        dispatch(setInvoices(res))
        dispatch(setLoadingInvoicesList(false))
      }, 1000)
    }

    fetchIncome()
  }, [dispatch])

  const tableHead = [
    { id: 'subject', label: 'Asunto de Pago', alignRight: false },
    { id: 'invoiceNumber', label: 'Número de Factura', alignRight: false },
    { id: 'id', label: 'Descargar Factura' },
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

  const downloadInvoice = () => {
    console.log('descargando factura')
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
          loading={loadingInvoiceList}
          searchParam='subject'
          download={downloadInvoice}
        >
          {row => {
            const { id, subject, invoiceNumber } = row;
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
                    {subject}
                  </Typography>
                </TableCell>
                <TableCell align="left">{invoiceNumber}</TableCell>
                {/* <TableCell align="left">{status?.label || ''}</TableCell> */}
                <TableCell align="left">
                  <Tooltip title='Descargar'>
                    <IconButton onClick={downloadInvoice}>
                      <Iconify icon='material-symbols:sim-card-download' width={20} height={20} />
                    </IconButton>
                  </Tooltip>
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