import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expensesList: [],
    incomeList: [],
    paymentsList: [],
    loadingExpensesList: false,
    loadingIncomeList: false,
    loadingPaymentsList: false,
    payment: null,
    loadingPayment: false,
    loadingCreatePayment: false,
    loadingEditPayment: false,
    // roleOptions: []
}

export const accountingSlice = createSlice({
    name: 'accounting',
    initialState,
    reducers: {
        setExpenses: (state, action) => {
            state.expensesList = action.payload;
        },
        setIncome: (state, action) => {
          state.incomeList = action.payload;
        },
        setPayments: (state, action) => {
          state.paymentsList = action.payload;
        },
        setLoadingExpensesList: (state, action) => {
            state.loadingExpensesList = action.payload;
        },
        setLoadingIncomeList: (state, action) => {
          state.loadingIncomeList = action.payload;
        },
        setLoadingPaymentsList: (state, action) => {
          state.loadingPaymentsList = action.payload;
        },
        setPayment: (state, action) => {
            state.payment = action.payload;
        },
        setLoadingPayment: (state, action) => {
            state.loadingPayment = action.payload;
        },
        setLoadingCreatePayment: (state, action) => {
            state.loadingCreatePayment = action.payload
        },
        setLoadingEditPayment: (state, action) => {
            state.loadingEditPayment = action.payload;
        },
        // setRoleOptions: (state, action) => {
        //     state.roleOptions = action.payload
        // }
    }
})

export const { 
    setExpenses,
    setIncome,
    setPayments,
    setLoadingExpensesList,
    setLoadingIncomeList,
    setLoadingPaymentsList,
    setPayment,
    setLoadingPayment,
    setLoadingCreatePayment,
    setLoadingEditPayment,
    // setRoleOptions
} = accountingSlice.actions;

export const accountingReducer = accountingSlice.reducer;
