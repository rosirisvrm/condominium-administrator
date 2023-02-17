import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    providersList: [],
    provider: null,
    loadingProvidersList: false,
    loadingProvider: false,
    loadingCreateProvider: false,
    loadingEditProvider: false,
    loadingDeleteProvider: false,
}

export const providersSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        setProviders: (state, action) => {
            state.providersList = action.payload;
        },
        setLoadingProvidersList: (state, action) => {
            state.loadingProvidersList = action.payload;
        },
        setProvider: (state, action) => {
            state.provider = action.payload;
        },
        setLoadingProvider: (state, action) => {
            state.loadingProvider = action.payload;
        },
        setLoadingCreateProvider: (state, action) => {
            state.loadingCreateProvider = action.payload
        },
        setLoadingEditProvider: (state, action) => {
            state.loadingEditProvider = action.payload;
        },
        setLoadingDeleteProvider: (state, action) => {
            state.loadingDeleteProvider = action.payload;
        },
    }
})

export const { 
    setProviders,
    setLoadingProvidersList,
    setProvider,
    setLoadingProvider,
    setLoadingCreateProvider,
    setLoadingEditProvider,
    setLoadingDeleteProvider
} = providersSlice.actions;

export const providersReducer = providersSlice.reducer;
