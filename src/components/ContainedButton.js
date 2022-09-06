import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 6),
    boxShadow: 'none',
    border: `2px solid ${theme.palette.primary.main}`,
}))

// ----------------------------------------------------------------------

ContainedButton.propTypes = {
    children: PropTypes.string,
    isRouterLink: PropTypes.bool,
    path: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
}

function ContainedButton({ children, isRouterLink = false, path = '', type = 'button', color = 'primary' }) {
    return(
        <>
            {isRouterLink ? 
                <ButtonStyle 
                    variant="contained"
                    color={color}
                    component={RouterLink}
                    to={path}
                >
                    {children}    
                </ButtonStyle> :
                <ButtonStyle 
                    variant="contained"
                    color={color}
                    type={type}
                >
                    {children}    
                </ButtonStyle>
            }
        </>
    );
}

export { ContainedButton };