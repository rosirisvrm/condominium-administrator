// @mui
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { Loader } from '../../../components/Loader';

// ----------------------------------------------------------------------

AppNewsUpdate.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  path: PropTypes.string,
  textButton: PropTypes.string,
  loading: PropTypes.bool
};

export default function AppNewsUpdate({ title, subheader, list, path, textButton, loading, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {loading ? 
        <Loader small /> :
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            {list.map((news) => (
              <NewsItem key={news.id} news={news} />
            ))}
          </Stack>
        </Scrollbar>
      }

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button 
          size="small" 
          color="inherit" 
          endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}
          component={RouterLink}
          to={path}
        >
          {textButton}
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.any,
};

function NewsItem({ news }) {

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box 
        component="img" 
        alt={news?.title || ''} 
        src={news?.image || ''} 
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0, cursor: 'pointer' }} 
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link 
          color="inherit" 
          variant="subtitle2" 
          underline="hover" 
          noWrap 
          sx={{ cursor: 'pointer' }}
          href={`/dashboard/noticias/detalle/${news?.id}`}
        >
          {news?.title || ''}
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {news?.sumary || ''}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {news?.postedAt ? fToNow(news.postedAt) : ''}
      </Typography>
    </Stack>
  );
}
