import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { OutlinedButton } from './OutlinedButton';
import { ContainedButton } from './ContainedButton';

DeleteModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onDelete: PropTypes.func,
    loading: PropTypes.bool
};

function DeleteModal({ open, handleClose, onDelete, loading }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Seguro que desea eliminar este elemento?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta es una acción irreversible, por favor esté seguro antes de realizar la acción.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <OutlinedButton onClick={handleClose}>
            Cancelar
        </OutlinedButton>
          <ContainedButton onClick={onDelete} autoFocus loading={loading}>
            Eliminar
          </ContainedButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export { DeleteModal };