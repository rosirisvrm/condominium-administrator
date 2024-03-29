import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': { border: `2px solid ${theme.palette.primary.main}` },
}))

const LoadingButtonStyle = styled(LoadingButton)(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': { 
        border: `2px solid ${theme.palette.primary.main}` 
    },
    '&:disabled': { 
        border: `2px solid ${theme.palette.primary.main}` 
    },
    '.css-1iyu4y0-MuiLoadingButton-loadingIndicator': {
        color: theme.palette.primary.main
    }
}))

// ----------------------------------------------------------------------

OutlinedButton.propTypes = {
    children: PropTypes.any,
    isRouterLink: PropTypes.bool,
    path: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    defaultMarginRight: PropTypes.bool,
    customMarginRight: PropTypes.string,
    defaultPadding: PropTypes.bool,
    customPadding: PropTypes.string,
    onClick: PropTypes.func,
    loading: PropTypes.bool
}

function OutlinedButton({
    children, 
    isRouterLink, 
    path, 
    type = 'button', 
    color = 'primary', 
    size = 'medium',
    defaultMarginRight,
    customMarginRight,
    defaultPadding,
    customPadding,
    onClick,
    loading,
    ...other
}){
    
    const theme = useTheme();

    const marginRight = defaultMarginRight ? theme.spacing(2) : customMarginRight;
    
    const padding = defaultPadding ? theme.spacing(1, 6) : customPadding;

    return(
        <>
            {isRouterLink &&
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    size={size}
                    component={RouterLink}
                    to={path}
                    sx={{
                        marginRight,
                        padding
                    }}
                    {...other}
                >
                    {children}
                </ButtonStyle>
            }       
            {(!isRouterLink && !loading) &&     
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    size={size}
                    type={type}
                    onClick={() => onClick()}
                    sx={{
                        marginRight,
                        padding
                    }}
                    {...other}
                >
                    {children}
                </ButtonStyle>
            }
            {(!isRouterLink && loading) && 
                <LoadingButtonStyle
                    variant="outlined"
                    color={color}
                    size={size}
                    loading
                    sx={{
                        marginRight,
                        padding
                    }}
                    {...other}
                >
                    {children}
                </LoadingButtonStyle>
            }
        </>
    );
}

export { OutlinedButton };