import React from 'react';
import PropTypes from 'prop-types'
// @mui
import { OutlinedInput, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';


// ----------------------------------------------------------------------

const FormControlStyle = styled(FormControl)(() => ({
    width: '100%',
}))

const LabelStyle = styled('span')(() => ({
    marginBottom: 8,
}));

const InputStyle = styled(OutlinedInput)(({ theme }) => ({
    '&.Mui-focused': { border: `2px solid ${theme.palette.primary.main}` },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    }
}));

const SelectStyle = styled(Select)(({ theme }) => ({
    '&.Mui-focused': { border: `2px solid ${theme.palette.primary.main}` },
    '&:hover': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
}));

const HelperTextStyle = styled(FormHelperText)(() => ({
    textAlign: 'end',
    marginRight: 0,
}))

// ----------------------------------------------------------------------

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    inputValue: PropTypes.any,
    setInputValue: PropTypes.func,
    isSelect: PropTypes.bool,
    selectOptions: PropTypes.array,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    helperText: PropTypes.string
}

function Input({ 
    label = '', 
    placeholder = '', 
    inputValue, 
    setInputValue, 
    isSelect = false, 
    selectOptions = [],
    multiline = false,
    rows = 4,
    disabled = false,
    helperText = '',
}){

    const theme = useTheme()

    const emStyle = {
        fontStyle: 'normal',
        color: theme.palette.grey[500]
    }
  
    const onChange = (event) => {
      setInputValue(event.target.value)
      console.log(event.target.value);
    }

    return(
    <FormControlStyle>
        {label && <LabelStyle>{label}</LabelStyle>}
        {!isSelect ? 
            <InputStyle
                value={inputValue}
                onChange={onChange}
                placeholder={placeholder}
                multiline={multiline}
                rows={rows}
                disabled={disabled}
            /> :
            <SelectStyle
                value={inputValue}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                disabled={disabled}
            >
                <MenuItem disabled value="">
                    <em style={emStyle}>{placeholder}</em>
                </MenuItem>
                {selectOptions.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                ))}
            </SelectStyle>
        }
        {helperText && <HelperTextStyle>{helperText}</HelperTextStyle>}
    </FormControlStyle>
    );
}

  export { Input };