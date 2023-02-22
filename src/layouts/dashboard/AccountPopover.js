import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
// 
import { logout } from '../../services/auth'
import { setAuth, setLoadingLogout } from '../../slices/authSlice';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Información General',
    icon: 'eva:settings-2-fill',
    linkTo: '/dashboard/informacion-general',
  },
  {
    label: 'Métodos de Pago',
    icon: 'eva:settings-2-fill',
    linkTo: '/dashboard/metodos-de-pago',
  },
  {
    label: 'Perfil',
    icon: 'eva:person-fill',
    linkTo: '/dashboard/perfil',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);

  const auth = useSelector(state => state.auth.user)

  const [open, setOpen] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(setLoadingLogout(true))

    setTimeout(() => {
      const logoutRequest = async () => {
        const logoutRes = await logout()

        dispatch(setAuth(null))
        dispatch(setLoadingLogout(false))
  
        if(logoutRes){
          navigate('/login');
        }
      }
  
      logoutRequest()
    }, 2000)

    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={auth?.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${auth?.name || ''} ${auth?.lastname || ''}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {auth?.role?.label || ''}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} to={option.linkTo} component={RouterLink} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Cerrar sesión
        </MenuItem>
      </MenuPopover>
    </>
  );
}
