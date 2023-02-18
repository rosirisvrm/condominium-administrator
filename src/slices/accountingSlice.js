import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expensesList: [],
    incomeList: [],
    paymentsList: [],
    invoicesList: [],
    loadingExpensesList: false,
    loadingIncomeList: false,
    loadingPaymentsList: false,
    loadingInvoicesList: false,
    payment: null,
    loadingPayment: false,
    loadingCreatePayment: false,
    loadingEditPayment: false,
    receiverTypeOptions: [],
    receiverOptions: [],
    statusOptions: [],
    loadingDeletePayment: false,
    loadingDownloadPayment: false,
    loadingDownloadInvoicesList: false,
    loadingDownloadInvoice: false,
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
        setInvoices: (state, action) => {
            state.invoicesList = action.payload;
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
        setLoadingInvoicesList: (state, action) => {
            state.loadingInvoicesList = action.payload;
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
        setReceiverTypeOptions: (state, action) => {
            state.receiverTypeOptions = action.payload
        },
        setReceiverOptions: (state, action) => {
            state.receiverOptions = action.payload
        },
        setStatusOptions: (state, action) => {
            state.statusOptions = action.payload
        },
        setLoadingDeletePayment: (state, action) => {
            state.loadingDeletePayment = action.payload
        },
        setLoadingDownloadPayment: (state, action) => {
            state.loadingDownloadPayment = action.payload
        },
        setLoadingDownloadInvoicesList: (state, action) => {
            state.loadingDownloadInvoicesList = action.payload
        },
        setLoadingDownloadInvoice: (state, action) => {
            state.loadingDownloadInvoice = action.payload
        },
    }
})

export const { 
    setExpenses,
    setIncome,
    setPayments,
    setInvoices,
    setLoadingExpensesList,
    setLoadingIncomeList,
    setLoadingPaymentsList,
    setLoadingInvoicesList,
    setPayment,
    setLoadingPayment,
    setLoadingCreatePayment,
    setLoadingEditPayment,
    setReceiverTypeOptions,
    setReceiverOptions,
    setStatusOptions,
    setLoadingDeletePayment,
    setLoadingDownloadPayment,
    setLoadingDownloadInvoicesList,
    setLoadingDownloadInvoice
} = accountingSlice.actions;

export const accountingReducer = accountingSlice.reducer;
