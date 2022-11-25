import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coin: {
        value: 0,
        label: 'USD',
        description: 'Dólar Américano',
        symbol: '$'
    },
}

export const customSettingsSlice = createSlice({
    name: 'customSettings',
    initialState,
    reducers: {
        setCoin: (state, action) => {
            state.coin = action.payload;
        },
    }
})

export const { 
    setCoin,
} = customSettingsSlice.actions;

export const customSettingsReducer = customSettingsSlice.reducer;
