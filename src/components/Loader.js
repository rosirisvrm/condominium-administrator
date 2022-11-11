import React from 'react';
// material
import { Card, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

  const CardStyle = styled(Card)(() => ({
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '500px'
  }));

function Loader(){
    return (
        <CardStyle>
            <CircularProgress />
        </CardStyle> 
    );
}

export { Loader };