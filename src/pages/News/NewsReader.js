import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { FormCard } from '../../components/FormCard';
import { OutlinedButton } from '../../components/OutlinedButton';
import { Loader } from '../../components/Loader';
import { DownloadFile } from '../../components/DownloadFile';
import { fDate } from '../../utils/formatTime';
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

const TypographyStyle = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[500]
  }))

// ----------------------------------------------------------------------

function NewsReader() {

  const { id } = useParams()

  const news = useSelector(state => state.news.news)
  const loadingNews = useSelector(state => state.news.loadingNews)

  const dispatch = useDispatch()

  const smUp = useResponsive('up', 'sm');
//   const mdUp = useResponsive('up', 'md');

  useEffect(() => {
    if(id){
        const fetchNews = async () => {
            dispatch(setLoadingNews(true))
            
            setTimeout(async ()=> {
                const res = await getNews(id)
                dispatch(setNews(res))
                // setFormValues()
                dispatch(setLoadingNews(false))
            }, 1000)
        }

        fetchNews()
    }
  }, [dispatch, id])

//   const [file, setFile] = React.useState(null)
//   const [image, setImage] = React.useState(null)

//   const setFormValues = () => {
//     // Falta setear file, image
//     setFile({ name: news?.file || '' })
//     setImage({ name: news?.image || '' })
//   }

//   const downloadImage = () => {
//     console.log('descarga de imagen');
//   };

  const downloadFile = () => {
    console.log('descarga de archivo');
  };

//   let spacing = 2;
//   if(smUp) spacing = 6;
//   if(mdUp) spacing = 12;

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
                        <Grid xs={12} item>
                            <Typography variant='h6'>
                                {news?.title || ''}
                            </Typography>
                        </Grid>

                        <Grid 
                         xs={4}
                         item
                         container
                        >
                            <Grid xs={6} item container alignItems="center">
                                <Iconify icon="mdi:user" 
                                    width={20} height={20} sx={{ color: '#919EAB', mr: 1 }}
                                />
                                <TypographyStyle variant='caption'>
                                    {news?.author?.name || ''}
                                </TypographyStyle> 
                            </Grid>  
                        
                            <Grid xs={6} item container alignItems="center">
                                <Iconify icon="material-symbols:calendar-today" 
                                    width={20} height={20} sx={{ color: '#919EAB', mr: 1 }} 
                                />
                                <TypographyStyle variant='caption'>
                                    {news?.postedAt ? fDate(news.postedAt) : ''}
                                </TypographyStyle>
                            </Grid>
                        </Grid>

                         <Grid 
                            item 
                            xs={12} 
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                         >
                           <img 
                            width={200}
                            height={150}
                            src={news?.image}
                            alt='News'
                            style={{
                                borderRadius: 12
                            }}
                           />
                        </Grid>

                        <Grid xs={12} item>
                            <Typography variant='body2'>
                                {news?.content || ''}
                            </Typography>
                        </Grid>


                        <Grid
                            item 
                            xs={12} 
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <DownloadFile label='' download={downloadFile} buttonText='Archivo Adjunto' />
                        </Grid>

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
      </Container>
    </Page>
  );
}

export { NewsReader };
