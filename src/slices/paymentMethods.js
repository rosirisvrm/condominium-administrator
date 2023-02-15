import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    paymentMethod: null,
    loadingPaymentMethod: false,
    loadingCreatePaymentMethod: false,
    loadingEditPaymentMethod: false,
    loadingDeletePaymentMethod: false,
}

export const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        setLoadingPaymentMethod: (state, action) => {
            state.loadingPaymentMethod = action.payload;
        },
        setLoadingCreatePaymentMethod: (state, action) => {
            state.loadingCreatePaymentMethod = action.payload;
        },
        setLoadingEditPaymentMethod: (state, action) => {
            state.loadingEditPaymentMethod = action.payload;
        },
        setLoadingDeletePaymentMethod: (state, action) => {
            state.loadingDeletePaymentMethod = action.payload;
        },
    }
})

export const { 
    setPaymentMethod,
    setLoadingPaymentMethod,
    setLoadingCreatePaymentMethod,
    setLoadingEditPaymentMethod,
    setLoadingDeletePaymentMethod
} = paymentMethodsSlice.actions;

export const paymentMethodsReducer = paymentMethodsSlice.reducer;