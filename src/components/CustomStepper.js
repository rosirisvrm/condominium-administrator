import React from 'react';
import PropTypes from 'prop-types'
// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

CustomStepper.propTypes = {
    stepsContent: PropTypes.array,
}

function CustomStepper({ stepsContent }){
    return(
        <>
            {stepsContent}
        </>
    );
}

export { CustomStepper };

  
