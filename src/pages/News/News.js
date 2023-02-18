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
import { fDate } from '../../utils/formatTime';
import { getNewsList, deleteNews, downloadNews } from '../../services/news';
import { setNewsList, setLoadingNewsList, setLoadingDeleteNews, setLoadingDownloadNews } from '../../slices/news'

// ----------------------------------------------------------------------

function News() {

  const news = useSelector(state => state.news.newsList)
  const loadingNewsList = useSelector(state => state.news.loadingNewsList)
  const loadingDeleteNews = useSelector(state => state.news.loadingDeleteNews)
  const loadingDownloadNews = useSelector(state => state.news.loadingDownloadNews)
  
  const dispatch = useDispatch()

  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('');
  const [reload, setReload] = useState(false);

  const tableHead = [
    { id: 'title', label: 'Título', alignRight: false },
    { id: 'author', label: 'Autor', alignRight: false },
    { id: 'postedAt', label: 'Fecha', alignRight: false },
    { id: '' },
  ];

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
    dispatch(setLoadingDeleteNews(true))

    setTimeout(() => {
      const res = deleteNews(id)
      dispatch(setLoadingDeleteNews(false))

      setColor(res ? 'success' : 'error')
      setOpen(true)
      setReload(prev => !prev)
    }, 1000)
  }

  const download = () => {
    dispatch(setLoadingDownloadNews(true))

    setTimeout(async () => {
      await downloadNews()
      dispatch(setLoadingDownloadNews(false))
    }, 2000)
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
          loadingDownload={loadingDownloadNews}
        >
          {row => {
            const { id, title, author, postedAt } = row;
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
                <TableCell align="right">
                  <UserActions 
                    actions={['delete', 'edit', 'detail']} 
                    idItem={id}
                    deleteItem={deleteItem}
                    loadingDelete={loadingDeleteNews}
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

        <CustomSnackbar 
          open={open}
          onClose={() => setOpen(false)}
          color={color}
        />

      </Container>
    </Page>
  );
}

export { News };
