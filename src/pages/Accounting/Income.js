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
} from '@mui/material';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import { CustomTable } from '../../components/CustomTable';
import { UserActions } from '../../sections/@dashboard/user';
//
import { getIncome } from '../../services/accounting';
import { setIncome, setLoadingIncomeList } from '../../slices/accountingSlice'

// ----------------------------------------------------------------------

function Income() {

  const incomeList = useSelector(state => state.accounting.incomeList)
  const loadingIncomeList = useSelector(state => state.accounting.loadingIncomeList)
  
  const dispatch = useDispatch()

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'address', label: 'Dirección', alignRight: false },
    { id: 'subject', label: 'Asunto', alignRight: false },
    { id: 'amount', label: 'Monto (USD)', alignRight: false },
    { id: 'reference', label: 'Referencia', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

  const [selected, setSelected] = useState([])

  useEffect(() => {
    const fetchIncome = async () => {
      dispatch(setLoadingIncomeList(true))

      setTimeout(async () => {
        const res = await getIncome()
        dispatch(setIncome(res))
        dispatch(setLoadingIncomeList(false))
      }, 1000)
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

  const deleteItem = (id) => {
    console.log('eliminando item', id);
  }

  const download = () => {
    console.log('descargando');
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
    <Page title="Ingresos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ingresos
          </Typography>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={incomeList} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingIncomeList}
          searchParam='subject'
          download={download}
        >
          {row => {
            const { id, name, address, subject, amount, reference, status } = row;
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
                <TableCell align="left">{address}</TableCell>
                <TableCell align="left">{subject}</TableCell>
                <TableCell align="left">{amount}</TableCell>
                <TableCell align="left">{reference}</TableCell>
                <TableCell align="left">
                  <Label variant="ghost" color={color}>
                    {sentenceCase(status.label)}
                  </Label>
                </TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      detail: `/dashboard/contabilidad/detalle-pago/${id}`,
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

export { Income };
