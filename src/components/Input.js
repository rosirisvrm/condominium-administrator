import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
// @mui
import { OutlinedInput, FormControl, Select, MenuItem, FormHelperText, TextField } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
//
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

const FormControlStyle = styled(FormControl)(() => ({
    width: '100%',
}))

const LabelStyle = styled('span')(() => ({
    marginBottom: 8,
}));

const HelperTextStyle = styled(FormHelperText)(() => ({
    marginRight: 0,
    marginLeft: 0,
}))

// ----------------------------------------------------------------------

Input.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isSelect: PropTypes.bool,
    selectOptions: PropTypes.array,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    helperText: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    control: PropTypes.object,
    error: PropTypes.object,
    validations: PropTypes.object,
    isDate: PropTypes.bool
}

function Input({ 
    label = '', 
    placeholder = '',
    isSelect = false, 
    selectOptions = [],
    multiline = false,
    rows = 4,
    disabled = false,
    helperText = '',
    type = 'text',
    name = '',
    control = null,
    error = null,
    validations = null,
    isDate = false,
    ...other
}){

    const theme = useTheme()

    const emStyle = {
        fontStyle: 'normal',
        color: theme.palette.grey[500]
    }

    let isError = false;
    
    if(error?.type) { 
        isError = true;
    }

    const smUp = useResponsive('up', 'sm');
    const mdUp = useResponsive('up', 'md');

    return(
        <FormControlStyle error={isError}>

            {label && <LabelStyle>{label}</LabelStyle>}

            {(!isSelect && !isDate) && 
                <Controller
                    name={name}
                    control={control}
                    rules={validations}
                    render={({ field: { onChange, value } }) => (
                        <OutlinedInput
                            onChange={onChange} 
                            value={value}
                            placeholder={placeholder}
                            multiline={multiline}
                            rows={rows}
                            disabled={disabled}
                            type={type}
                            {...other}
                        /> 
                    )}
                />
            }

            {isSelect &&
                <Controller
                    name={name}
                    control={control}
                    rules={validations}
                    render={({ field: { onChange, value } }) => (
                        <Select
                            onChange={onChange} 
                            value={value}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            disabled={disabled}
                            {...other}
                        >
                            <MenuItem disabled value="">
                                <em style={emStyle}>{placeholder}</em>
                            </MenuItem>
                            {selectOptions.map((item, index) => (
                                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    )}
                />
            }

            {isDate &&
                <Controller
                    name={name}
                    control={control}
                    rules={validations}
                    render={({ field: { onChange, value } }) => (
                        <>
                            {!smUp ? 
                                <MobileDatePicker
                                    inputFormat="MM/dd/yyyy"
                                    onChange={onChange} 
                                    value={value}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ width:  '100%' }} />
                                    )}
                                />
                                :
                                <DesktopDatePicker
                                    inputFormat="MM/dd/yyyy"
                                    onChange={onChange} 
                                    value={value}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ width:  '100%' }} />
                                    )}
                                />
                            }
                        </>
                    )}
                />
            }

            {helperText &&
                <HelperTextStyle style={{ textAlign: 'end' }}>
                    {helperText}
                </HelperTextStyle>
            }
            {error && 
                <HelperTextStyle style={{ textAlign: 'start' }}>
                    {error.message}
                </HelperTextStyle>
            }
        </FormControlStyle>
    );
}

  export { Input };