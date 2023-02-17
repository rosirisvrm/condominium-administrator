import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { IconButton, Tooltip } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { DeleteModal } from '../../../components/DeleteModal';

// ----------------------------------------------------------------------

UserActions.propTypes = {
    actions: PropTypes.array,
    deleteItem: PropTypes.func,
    idItem: PropTypes.string,
    actionsRedirect: PropTypes.object,
    loadingDelete: PropTypes.bool
}

export default function UserActions({ actions, idItem, deleteItem, actionsRedirect, loadingDelete }) {

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const onDelete = () => {
    deleteItem(idItem)
  }
    
  return (
    <>
        {actions.map(element => {
          if(element === 'delete'){
            return (
              <Tooltip title="Eliminar" key={element}>
                <IconButton sx={{ color: 'text.secondary' }} onClick={handleClickOpenDelete} key={element}>
                  <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                </IconButton>
              </Tooltip>
            );

          }
          
          if(element === 'edit'){
            return (
              <Tooltip title="Editar" key={element}>
                <IconButton component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
                  <Iconify icon="eva:edit-fill" width={24} height={24} />
                </IconButton>
              </Tooltip>
            );
          }

          if(element === 'answer'){
            return (
              <Tooltip title="Responder" key={element}>
                <IconButton component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
                  <Iconify icon="mdi:file-document-check" width={24} height={24} />
                </IconButton>
              </Tooltip>
            );
          }
          
          // Detail
          return(
            <Tooltip title="Ver Detalle" key={element}>
              <IconButton component={RouterLink} to={actionsRedirect[element]} sx={{ color: 'text.secondary' }} key={element}>
                <Iconify icon="charm:eye" width={24} height={24} />
              </IconButton>
            </Tooltip>
          );
        })}

        <DeleteModal 
          open={openDelete}
          handleClose={handleCloseDelete}
          onDelete={onDelete}
          loading={loadingDelete}
        />
    </>
  );
}
