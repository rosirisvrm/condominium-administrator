import React from 'react';
import PropTypes from 'prop-types'
// @mui
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const CardStyle = styled(Card)(({ theme }) => ({
    padding: theme.spacing(5),
}));

FormCard.propTypes = {
    children: PropTypes.node.isRequired,
}

function FormCard({ children }){
    return(
        <CardStyle>
            {children}
        </CardStyle>
    );
}

export { FormCard };

  
