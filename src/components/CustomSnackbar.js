import React from 'react'
import PropTypes from 'prop-types'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

// ----------------------------------------------------------------------

CustomSnackbar.propTypes = {
    message: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    hideDuration: PropTypes.number,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    color: PropTypes.string,
}


function CustomSnackbar({
    message,
    open,
    onClose,
    hideDuration = 5000,
    vertical = 'top',
    horizontal = 'right',
    color,
}){

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        onClose(false);
    };

    return(
        <Snackbar 
            open={open} 
            autoHideDuration={hideDuration} 
            anchorOrigin={{ vertical, horizontal }} 
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                {color === 'success' && 'La operación se ha realizado exitosamente'}
                {color === 'error' && 'Ha ocurrido un error, operación fallida'} 
                {message && message}
            </Alert>
        </Snackbar>
    );
}

export { CustomSnackbar };