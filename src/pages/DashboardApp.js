// @mui
import { Grid, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// components
import Page from '../components/Page';
// sections
import { AppNewsUpdate, AppOrderTimeline } from '../sections/@dashboard/app';
// services
import { getNewsList } from '../services/news';
import { getPayments } from '../services/accounting';
// actions 
import { setNewsList, setLoadingNewsList } from '../slices/news';
import { setPayments, setLoadingPaymentsList } from '../slices/accountingSlice';

// ----------------------------------------------------------------------

function DashboardApp() {

  const news = useSelector(state => state.news.newsList)
  const loadingNewsList = useSelector(state => state.news.loadingNewsList)
  const payments = useSelector(state => state.accounting.paymentsList)
  const loadingPaymentsList = useSelector(state => state.accounting.loadingPaymentsList)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(setLoadingNewsList(true))

      setTimeout(() => {
        const res = getNewsList({ perPage: 5 })
        dispatch(setNewsList(res))
        dispatch(setLoadingNewsList(false))
      }, 2000)
    }

    fetchNews()

    const fetchPayments = async () => {
      dispatch(setLoadingPaymentsList(true))

      setTimeout(() => {
        const res = getPayments({ perPage: 5 })
        dispatch(setPayments(res))
        dispatch(setLoadingPaymentsList(false))
      }, 2000)
    }

    fetchPayments()
  }, [dispatch])

  return (
    <Page>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, bienvenido 
        </Typography>

        <Grid container spacing={3}>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Nuevas Noticias"
              list={news}
              path='/dashboard/noticias'
              textButton='Ver todas'
              loading={loadingNewsList}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Pagos Recientes"
              list={payments}
              path='/dashboard/contabilidad/pagos'
              textButton='Ver todos'
              loading={loadingPaymentsList}
            />
          </Grid>
          
        </Grid>
      </Container>
    </Page>
  );
}

export { DashboardApp };
