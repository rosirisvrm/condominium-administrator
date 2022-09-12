import React from 'react';
import { PropTypes } from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button } from '@mui/material';
import { styled,useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme }) => ({
    // padding: theme.spacing(1, 6),
    // marginRight: theme.spacing(2),
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': { border: `2px solid ${theme.palette.primary.main}` },
}))

OutlinedButton.propTypes = {
    children: PropTypes.string,
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
    onClick
}){
    
    const theme = useTheme()

    const marginRight = defaultMarginRight ? theme.spacing(2) : customMarginRight;
    const padding = defaultPadding ? theme.spacing(1, 6) : customPadding;


    return(
        <>
            {isRouterLink ?
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    component={RouterLink}
                    to={path}
                    size={size}
                    sx={{
                        marginRight,
                        padding
                    }}
                >
                    {children}
                </ButtonStyle> : 
                <ButtonStyle 
                    variant="outlined"
                    color={color}
                    type={type}
                    size={size}
                    onClick={() => onClick()}
                    sx={{
                        marginRight,
                        padding
                    }}
                >
                    {children}
                </ButtonStyle>
            }
        </>
    );
}

export { OutlinedButton };