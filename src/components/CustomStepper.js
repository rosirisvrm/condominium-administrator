import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { ContainedButton } from './ContainedButton';
import { OutlinedButton } from './OutlinedButton';
//
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

const StepperButtonsContainer = styled(Box)(({ theme }) => ({
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
    paddingTop: theme.spacing(2), 
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(8),
}))
 
const StepperButtons = ({ handleBack, handleNext, activeStep, steps, smUp, loading }) => (
    <StepperButtonsContainer>
        {activeStep === 0 ? 
            <OutlinedButton 
                isRouterLink
                path="/dashboard/encuestas"
                defaultPadding
                defaultMarginRight={smUp}
            >
                Volver
            </OutlinedButton>
        :
            <OutlinedButton 
                onClick={handleBack} 
                defaultPadding
                defaultMarginRight={smUp}
            >
                Volver
            </OutlinedButton>
        }

        <Box sx={{ flex: '1 1 auto' }} />

        {activeStep === steps - 1 ? 
            <ContainedButton type='submit' defaultPadding loading={loading}>
                Crear y Finalizar
            </ContainedButton>
        :
            <ContainedButton onClick={handleNext} defaultPadding>
                Siguiente
            </ContainedButton>
        }
    </StepperButtonsContainer>
)

StepperButtons.propTypes = {
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    activeStep: PropTypes.number,
    steps: PropTypes.number,
    smUp: PropTypes.bool,
    loading: PropTypes.bool
}

// ----------------------------------------------------------------------

CustomStepper.propTypes = {
    children: PropTypes.node,
    activeStep: PropTypes.number,
    steps: PropTypes.array,
    loading: PropTypes.bool,
    handleNext: PropTypes.func,
    handleBack: PropTypes.func
}

function CustomStepper({ children, activeStep, steps, loading, handleBack, handleNext }){

    const smUp = useResponsive('up', 'sm');

    return(
        <>
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {children}

            <StepperButtons
                handleBack={handleBack} 
                handleNext={handleNext} 
                activeStep={activeStep} 
                steps={steps.length} 
                smUp={smUp}
                loading={loading}
            />
        </>
    );
}

export { CustomStepper };

  
