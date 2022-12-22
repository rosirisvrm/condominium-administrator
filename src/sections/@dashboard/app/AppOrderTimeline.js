import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Card, Typography, CardHeader, CardContent, Box, Button, Divider } from '@mui/material';
import { Timeline, TimelineDot, TimelineItem, TimelineContent, TimelineSeparator, TimelineConnector } from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import { Loader } from '../../../components/Loader';

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  path: PropTypes.string,
  textButton: PropTypes.string,
  loading: PropTypes.bool
};

export default function AppOrderTimeline({ title, subheader, list, path, textButton, loading, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
          pb: 0,
        }}
      >
        {loading ? 
          <Loader small /> :
          <Timeline>
            {list.map((item, index) => (
              <OrderItem key={item.id} item={item} isLast={index === list.length - 1} />
            ))}
          </Timeline>
        }
      </CardContent>

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

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.any,
};

function OrderItem({ item, isLast }) {
  
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (item?.status?.value === 0 && 'warning') ||
            (item?.status?.value === 1 && 'success') ||
            (item?.status?.value === 2 && 'error')
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{item?.subject || ''}</Typography>

        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {item?.date ? fDateTime(item.date): ''}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
