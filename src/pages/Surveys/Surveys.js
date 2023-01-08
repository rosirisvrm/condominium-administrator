import { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { sentenceCase } from 'change-case';
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
//
import { fDate } from '../../utils/formatTime';
//
import { getSurveys } from '../../services/surveys';
import { setSurveys, setLoadingSurveysList } from '../../slices/surveys';

// ----------------------------------------------------------------------

function Surveys() {

  const surveys = useSelector(state => state.surveys.surveysList)
  const loadingSurveysList = useSelector(state => state.surveys.loadingSurveysList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchRequests = async () => {
      dispatch(setLoadingSurveysList(true))

      setTimeout(async () => {
        const res = await getSurveys()
        dispatch(setSurveys(res))
        dispatch(setLoadingSurveysList(false))
      }, 1000)
    }

    fetchRequests()
  }, [dispatch])

  const tableHead = [
    { id: 'title', label: 'Título', alignRight: false },
    { id: 'answers', label: 'Respuestas', alignRight: false },
    { id: 'initialDate', label: 'Fecha inicio', alignRight: false },
    { id: 'finalDate', label: 'Fecha fin', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
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

  const deleteItem = (id) => {
    console.log('eliminando item ', id)
  }

  const download = () => {
    console.log('descargando');
  }

  return (
    <Page title="Encuestas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Encuestas
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/encuestas/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable
          tableHead={tableHead} 
          elementList={surveys} 
          selected={selected}
          setSelected={setSelected}
          loading={loadingSurveysList}
          searchParam='title'
          download={download}
        >
          {row => {
            const { id, title, answers, initialDate, finalDate, status, users } = row;
            const isItemSelected = selected.indexOf(id) !== -1;
            let color;

            if(status === 'Por Enviar'){
              color = 'warning'

            }else if(status === 'Enviada'){
              color = 'success'

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
                  <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" noWrap>
                    {title}
                  </Typography>
                </TableCell>
                <TableCell align="left">{`${answers} / ${users}`}</TableCell>
                <TableCell align="left">{fDate(initialDate)}</TableCell>
                <TableCell align="left">{fDate(finalDate)}</TableCell>
                <TableCell align="left">
                  <Label variant="ghost" color={color}>
                    {sentenceCase(status)}
                  </Label>
                </TableCell>

                <TableCell align="right">
                  <UserMoreMenu 
                    actions={['delete', 'edit', 'detail', 'answer']}
                    idItem={id}
                    deleteItem={deleteItem}
                    actionsRedirect={{
                      edit: `/dashboard/encuestas/editar/${id}`,
                      answer: `/dashboard/encuestas/responder/${id}`,
                      detail: `/dashboard/encuestas/detalle/${id}`,
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

export { Surveys };
