import React from 'react';
import PropTypes from 'prop-types';
// material
import { Card, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const CardStyle = styled(Card)(() => ({
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '500px'
}));

const SmallContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  height: 300
}));

Loader.propTypes = {
  small: PropTypes.bool
};

function Loader({ small = false }){

  if(small){
    return (
      <SmallContainer>
        <CircularProgress /> 
      </SmallContainer> 
    );
  }

  return (  
    <CardStyle>
      <CircularProgress />
    </CardStyle>
  );
}

export { Loader };