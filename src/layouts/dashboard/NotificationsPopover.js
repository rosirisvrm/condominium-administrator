import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// @mui
import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Skeleton,
  Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
//
import { getNotificationsList } from '../../services/notifications';
import { setNotificationsList, setLoadingLayoutNotifications } from '../../slices/notifications';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const anchorRef = useRef(null);

  const dispatch = useDispatch();

  const notificationsRedux = useSelector(state => state.notifications.notificationsList);

  const loadingLayoutNotifications = useSelector(state => state.notifications.loadingLayoutNotifications);

  const unread = notificationsRedux.filter((item) => item.isUnRead === true);

  const read = notificationsRedux.filter((item) => item.isUnRead === false);

  const totalUnRead = notificationsRedux.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(setLoadingLayoutNotifications(true))

      setTimeout(async () => {
        const res = await getNotificationsList({ perPage: 10 })
        dispatch(setNotificationsList(res))
        dispatch(setLoadingLayoutNotifications(false))
      }, 2000)
    }

    fetchNotifications()

    setInterval(fetchNotifications, 20000);
  }, [dispatch])

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    // http request here to change isUnRead notification state to false
    dispatch(setNotificationsList(
      notificationsRedux.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    ));
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tienes {totalUnRead} notificaciones sin leer
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Marcar como leído">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 400 } }}>
          {loadingLayoutNotifications ? 
            <NotificationSkeleton length={3} />
            :
            <>
              {unread.length > 0 &&
                <List
                  disablePadding
                  subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                      Nuevas
                    </ListSubheader>
                  }
                >
                  {unread.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </List>
              }

              {read.length > 0 &&
                <List
                  disablePadding
                  subheader={
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                      Leídas
                    </ListSubheader>
                  }
                >
                  {read.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </List>
              }
            </>
          }
        </Scrollbar>

        {/* <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Ver todas
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    date: PropTypes.any,
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    avatar: PropTypes.any,
    type: PropTypes.string,
  }),
};

function NotificationItem({ notification }) {
  const theme = useTheme()
  const { avatar, title } = renderContent(notification, theme);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification?.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {avatar}
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {notification?.date ? fToNow(notification.date) : ''}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification, theme) {
  const title = (
    <>
      <Typography variant="subtitle2">
        {notification?.title || ''}
      </Typography>

      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        {notification?.text || ''}
      </Typography>
    </>
  );

  if (notification.type === 'published_news') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.primary.main, bgcolor: 'background.neutral' }}>
          <Iconify icon='mdi:newspaper-variant' width={20} height={20} />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === 'payment_sent') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.primary.main, bgcolor: 'background.neutral' }}>
          <Iconify icon='icon-park-solid:doc-success' width={20} height={20} />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === 'payment_approved') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.success.main, bgcolor: 'background.neutral' }}>
          <Iconify icon='material-symbols:check-circle-rounded' width={20} height={20} />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === 'payment_rejected') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.error.main, bgcolor: 'background.neutral'}}>
          <Iconify icon='fluent-mdl2:status-error-full' width={20} height={20} />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === 'payment_date_due') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.warning.main, bgcolor: 'background.neutral' }}>
          <Iconify icon='mdi:warning-circle' width={20} height={20} />
        </Avatar>
      ),
      title,
    };
  }
  if (notification.type === 'payment_date_due_soon') {
    return {
      avatar: (
        <Avatar sx={{ color: theme.palette.warning.main, bgcolor: 'background.neutral' }}>
          <Iconify icon='mdi:clock-alert-outline' width={20} height={20} />,
        </Avatar>
      ),
      title,
    };
  }

  return {
    avatar: notification?.avatar ? <img alt={notification?.title} src={notification?.avatar} /> : null,
    title,
  };
}

// ----------------------------------------------------------------------

NotificationSkeleton.propTypes = {
  length: PropTypes.number
};

function NotificationSkeleton({ length }){
  return (
    <>
      <Skeleton height={20} width="30%" sx={{ my: 1, ml: 2 }} />

      {[...Array(length)].map((_, index) => (
        <Grid container sx={{ p: 2 }} key={index}>
          <Grid item xs={2} container alignItems='center' justifyContent='center'>
            <Skeleton variant="circular" width={40} height={40} />
          </Grid>
          <Grid item xs={10}>
            <Skeleton height={20} width="90%" />
            <Skeleton height={20} width="90%" />
            <Skeleton height={20} width="70%" />
            <Skeleton height={20} width="50%" />
          </Grid>
        </Grid>
      ))}
    </>
  )
}
