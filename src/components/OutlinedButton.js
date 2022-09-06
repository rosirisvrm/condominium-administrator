import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';


// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1, 6),
    marginRight: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': { border: `2px solid ${theme.palette.primary.main}` },
}))

OutlinedButton.propTypes = {
    children: PropTypes.string,
    isRouterLink: PropTypes.bool,
    path: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
}

function OutlinedButton({ children, isRouterLink = true, path = '', type = 'button', color = 'primary' }){
    return(
        <>
            {isRouterLink ?
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    component={RouterLink}
                    to={path}
                >
                    {children}
                </ButtonStyle> : 
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    type={type}
                >
                    {children}
                </ButtonStyle>
            }
        </>
    );
}

export { OutlinedButton };