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
import { fDate } from '../../utils/formatTime';
import { getNewsList } from '../../services/news';
import { setNewsList, setLoadingNewsList } from '../../slices/news'

// ----------------------------------------------------------------------

function News() {

  const news = useSelector(state => state.news.newsList)
  const loadingNewsList = useSelector(state => state.news.loadingNewsList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoadingNewsList(true))

      setTimeout(async () => {
        const res = await getNewsList()
        dispatch(setNewsList(res))
        dispatch(setLoadingNewsList(false))
      }, 1000)
    }

    fetchNews()
  }, [dispatch])

  const tableHead = [
    { id: 'title', label: 'Título', alignRight: false },
    { id: 'author', label: 'Autor', alignRight: false },
    { id: 'postedAt', label: 'Fecha', alignRight: false },
    { id: 'sections', label: 'Secciones', alignRight: false },
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
    console.log('eliminando item', id);
  }

  const download = () => {
    console.log('descargando');
  }

  return (
    <Page title="Noticias">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Noticias
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/noticias/crear" startIcon={<Iconify icon="eva:plus-fill" />}>
            Crear
          </Button>
        </Stack>

        <CustomTable 
          tableHead={tableHead} 
          elementList={news} 
          selected={selected} 
          setSelected={setSelected}
          loading={loadingNewsList}
          searchParam='title'
          download={download}
        >
          {row => {
            const { id, title, author, postedAt, sections } = row;
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
                    {title}
                  </Typography>
                </TableCell>
                <TableCell align="left">{author?.name || ''}</TableCell>
                <TableCell align="left">{postedAt ? fDate(postedAt) : ''}</TableCell>
                <TableCell align="left">{sections.length}</TableCell>
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem} 
                    actionsRedirect={{
                      edit: `/dashboard/noticias/editar/${id}` ,
                      detail: `/dashboard/noticias/detalle/${id}`,
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

export { News };
