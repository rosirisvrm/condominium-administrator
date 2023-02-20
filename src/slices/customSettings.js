import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    coin: null,
    coinOptions: [],
    rate: null,
    paymentMethodOptions: [],
    loadingPaymentMethods: false,
    paymentMethodTypeOptions: [],
    bankOptions: [],
    identificationTypeOptions: [],
    generalInfo: null,
    loadingGeneralInfo: false,
    loadingEditGeneralInfo: false,
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
        setLoadingPaymentMethods: (state, action) => {
            state.loadingPaymentMethods = action.payload;
        },
        setPaymentMethodTypeOptions: (state, action) => {
            state.paymentMethodTypeOptions = action.payload;
        },
        setBankOptions: (state, action) => {
            state.bankOptions = action.payload;
        },
        setIdentificationTypeOptions: (state, action) => {
            state.identificationTypeOptions = action.payload;
        },
        setGeneralInfo: (state, action) => {
            state.generalInfo = action.payload;
        },
        setLoadingGeneralInfo: (state, action) => {
            state.loadingGeneralInfo = action.payload;
        },
        setLoadingEditGeneralInfo: (state, action) => {
            state.loadingEditGeneralInfo = action.payload;
        },
    }
})

export const { 
    setCoin,
    setCoinOptions,
    setRate,
    setPaymentMethodOptions,
    setLoadingPaymentMethods,
    setPaymentMethodTypeOptions,
    setBankOptions,
    setIdentificationTypeOptions,
    setGeneralInfo,
    setLoadingGeneralInfo,
    setLoadingEditGeneralInfo
} = customSettingsSlice.actions;

export const customSettingsReducer = customSettingsSlice.reducer;
