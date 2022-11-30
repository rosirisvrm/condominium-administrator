import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coin: {
        value: 0,
        label: 'USD',
        description: 'Dólar Américano',
        symbol: '$'
    },
    paymentMethodOptions: [],
}

export const customSettingsSlice = createSlice({
    name: 'customSettings',
    initialState,
    reducers: {
        setCoin: (state, action) => {
            state.coin = action.payload;
        },
        setPaymentMethodOptions: (state, action) => {
            state.paymentMethodOptions = action.payload;
        },
    }
})

export const { 
    setCoin,
    setPaymentMethodOptions
} = customSettingsSlice.actions;

export const customSettingsReducer = customSettingsSlice.reducer;
