import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { CustomTable } from '../../components/CustomTable';
import { UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import LIST from '../../_mock/request';

// ----------------------------------------------------------------------

function Requests() {

  const tableHead = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'address', label: 'Dirección', alignRight: false },
    { id: 'subject', label: 'Asunto', alignRight: false },
    { id: 'level', label: 'Nivel', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

  console.log('list ', LIST);

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

  const deleteItem = (id) => {
    console.log('eliminando item ', id)
  }

  return (
    <Page title="Solicitudes y Sugerencias">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Solicitudes y Sugerencias
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/solicitudes-sugerencias/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable
          tableHead={tableHead} 
          elementList={LIST} 
          selected={selected} 
          setSelected={setSelected}
        >
          {row => {
            const { id, name, address, subject, level, status } = row;
            const isItemSelected = selected.indexOf(name) !== -1;
            let color;

            if(status === 'Pendiente'){
              color = 'warning'

            }else if(status === 'Aprobada'){
              color = 'success'

            }else if(status === 'Rechazada'){
              color = 'error'

            }

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
                <TableCell align="left">{subject}</TableCell>
                <TableCell align="left">{level}</TableCell>
                <TableCell align="left">
                  <Label variant="ghost" color={color}>
                    {sentenceCase(status)}
                  </Label>
                </TableCell>

                <TableCell align="right">
                  <UserMoreMenu 
                    actions={['delete', 'edit', 'detail']}
                    deleteItem={deleteItem}
                    idItem={id}
                    actionsRedirect={{
                      edit: `/dashboard/solicitudes-sugerencias/editar/${id}`,
                      detail: `/dashboard/solicitudes-sugerencias/detalle/${id}`,
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

export { Requests };
