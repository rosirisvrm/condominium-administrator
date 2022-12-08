import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coin: {
        value: 0,
        label: 'USD',
        description: 'Dólar Americano',
        symbol: '$'
    },
    coinOptions: [],
    rate: 13.42,
    paymentMethodOptions: [],
}

export const customSettingsSlice = createSlice({
    name: 'customSettings',
    initialState,
    reducers: {
        setCoin: (state, action) => {
            state.coin = action.payload;
        },
        setCoinOptions: (state, action) => {
            state.coinOptions = action.payload;
        },
        setRate: (state, action) => {
            state.rate = action.payload;
        },
        setPaymentMethodOptions: (state, action) => {
            state.paymentMethodOptions = action.payload;
        },
    }
})

export const { 
    setCoin,
    setCoinOptions,
    setRate,
    setPaymentMethodOptions,
} = customSettingsSlice.actions;

export const customSettingsReducer = customSettingsSlice.reducer;
