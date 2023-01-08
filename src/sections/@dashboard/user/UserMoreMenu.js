import PropTypes from 'prop-types'
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

  UserMoreMenu.propTypes = {
    actions: PropTypes.array,
    deleteItem: PropTypes.func,
    idItem: PropTypes.string,
    actionsRedirect: PropTypes.object,
  }

export default function UserMoreMenu({ actions, idItem, deleteItem, actionsRedirect }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        {actions.map(element => {

          if(element === 'delete'){
            return (
              <MenuItem sx={{ color: 'text.secondary' }} onClick={() => deleteItem(idItem)} key={element}>
                <ListItemIcon>
                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            );

          }
          
          if(element === 'edit'){
            return (
              <MenuItem component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
                <ListItemIcon>
                  <Iconify icon="eva:edit-fill" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            );
          }

          if(element === 'answer'){
            return (
              <MenuItem component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
                <ListItemIcon>
                  <Iconify icon="mdi:file-document-check" width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Responder" primaryTypographyProps={{ variant: 'body2' }} />
              </MenuItem>
            );
          }
          
          // Detail
          return(
            <MenuItem component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
              <ListItemIcon>
                <Iconify icon="charm:eye" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Ver Detalle" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
          );
          
        })}

      </Menu>
    </>
  );
}
