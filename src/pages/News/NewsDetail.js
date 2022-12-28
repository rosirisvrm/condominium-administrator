import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
// @mui
import { Container, Typography, Grid, TableCell, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { Input } from '../../components/Input';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { BasicTable } from '../../components/BasicTable';
// hooks
import useResponsive from '../../hooks/useResponsive';
// services
import { getNews } from '../../services/news';
// slices
import { setLoadingNews, setNews } from '../../slices/news';

// ----------------------------------------------------------------------

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(0)} !important`
}))

// ----------------------------------------------------------------------

function NewsDetail() {

  const { id } = useParams()

  const news = useSelector(state => state.news.news)
  const loadingNews = useSelector(state => state.news.loadingNews)

  const dispatch = useDispatch()

  const { control, setValue } = useForm({
    defaultValues: {
      title: '',
      sumary: '',
      content: '',
      image: '',
      file: '',
      sectionTitle: '',
      sectionContent: '',
      sectionFile: '',
    }
  });

  useEffect(() => {
    if(id){
        const fetchNews = async () => {
            dispatch(setLoadingNews(true))
            
            setTimeout(async ()=> {
                const res = await getNews(id)
                dispatch(setNews(res))
                setFormValues()
                dispatch(setLoadingNews(false))
            }, 1000)
        }

        fetchNews()
    }
  }, [dispatch, id])

  const smUp = useResponsive('up', 'sm');

  const [file, setFile] = React.useState(null)
  const [image, setImage] = React.useState(null)
  const [sectionFile, setSectionFile] = React.useState(null)

  const setFormValues = () => {
    setValue("title", news?.title || '')
    setValue("sumary", news?.sumary || '')
    setValue("content", news?.content || '')
    setValue("image", news?.image || '')
    setValue("file", news?.file || '')

    // Falta setear file, image
    setFile({ name: news?.file || '' })
    setImage({ name: news?.image || '' })

    if(news?.sections?.length > 0){
        setSections(news.sections)
    }
  }

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);

    setValue("sectionTitle", '')
    setValue("sectionContent", '')
    setValue("sectionFile", '')
    setSectionFile(null)
  };

  const [sections, setSections] = React.useState([]);

  const headers = ['Subtítulo', 'Imagen/Archivo', ''];

  const viewSection = (index) => {
    handleClickOpen()

    const section = sections.find((_, i) => index === i)

    setValue("sectionTitle", section?.title || '')
    setValue("sectionContent", section?.content || '')
    setValue("sectionFile", section?.file?.name || '')
    setSectionFile(section.file)
  }

  return (
    <Page title='Detalle de Noticia'>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Detalle de Noticia
        </Typography>

        {(id && loadingNews) ?
            <Loader /> :
            <FormCard>   
                <form>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Input
                                name='title'
                                label='Título'
                                disabled
                                type='text'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='content'
                                label='Contenido'
                                disabled
                                multiline
                                type='text'
                                control={control}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Input
                                name='sumary'
                                label='Resumen'
                                disabled
                                multiline
                                rows={2}
                                type='text'
                                control={control}
                            />
                        </Grid>

                        {/* <Grid item xs={12} container direction="column">
                            
                        </Grid>

                        <Grid item xs={12} container direction="column">
                            
                        </Grid> */}

                        {sections.length > 0 && 
                            <>
                                <Typography variant="h6" sx={{ pt: 2, pl: 2 }}>
                                    Secciones
                                </Typography>

                                <BasicTable headers={headers} elements={sections}>
                                    {(row, index) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">{row?.title || ''}</TableCell>
                                            <TableCell component="th" scope="row">{row?.file?.name || row?.file}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => viewSection(index)} sx={{ p: 0 }}>
                                                    <Iconify icon="charm:eye" width={24} height={24} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </BasicTable>
                            </>
                        }

                        <Grid
                            container
                            item
                            spacing={2}
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            mt={8}
                        >
                            <GridStyle container item xs={12} sm={3} md={2} justifyContent={smUp ? 'flex-end' : 'center'} mb={!smUp ? 2 : 0}>
                                <OutlinedButton 
                                    isRouterLink 
                                    path="/dashboard/noticias"
                                    defaultPadding
                                    defaultMarginRight={smUp}
                                >
                                    Volver
                                </OutlinedButton>
                            </GridStyle>
                        </Grid>

                    </Grid>
                </form>
            </FormCard>
        }

        <Modal 
            open={dialogOpen}
            handleClose={handleClose}
            title='Sección de Noticia'
            closeButtonText='Cerrar'
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Input
                        name='sectionTitle'
                        label='Subtítulo'
                        disabled
                        type='text'
                        control={control}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Input
                        name='sectionContent'
                        label='Contenido'
                        disabled
                        multiline
                        type='text'
                        control={control}
                    />
                </Grid>

                {/* <Grid item xs={12} container direction="column">
                
                </Grid> */}
            </Grid>
        </Modal>

      </Container>
    </Page>
  );
}

export { NewsDetail };
