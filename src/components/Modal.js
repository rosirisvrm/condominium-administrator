import React from 'react';
import PropTypes from 'prop-types';
// material
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import { OutlinedButton } from './OutlinedButton';
import { ContainedButton } from './ContainedButton';

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  closeButtonText: PropTypes.string,
  saveButtonText: PropTypes.string,
  disabledSaveButton: PropTypes.bool
};

function Modal({ 
    title, 
    children, 
    open, 
    handleClose, 
    closeButtonText, 
    saveButtonText,
    handleSave,
    disabledSaveButton,
}){

  return (  
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 1 }}>
            {closeButtonText && 
                <OutlinedButton onClick={handleClose}>
                    {closeButtonText}
                </OutlinedButton>
            }
            {saveButtonText && 
                <ContainedButton onClick={handleSave} disabled={disabledSaveButton}>
                    {saveButtonText}
                </ContainedButton>
            }
        </DialogActions>
    </Dialog>
  );
}

export { Modal };