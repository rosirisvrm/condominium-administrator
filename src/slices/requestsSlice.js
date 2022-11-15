import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    requestsList: [],
    request: null,
    loadingRequestsList: false,
    loadingRequest: false,
    loadingCreateRequest: false,
    loadingEditRequest: false,
    levelOptions: [],
    statusOptions: []
}

export const requestSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        setRequests: (state, action) => {
            state.requestsList = action.payload;
        },
        setLoadingRequestsList: (state, action) => {
            state.loadingRequestsList = action.payload;
        },
        setRequest: (state, action) => {
            state.request = action.payload;
        },
        setLoadingRequest: (state, action) => {
            state.loadingRequest = action.payload;
        },
        setLoadingCreateRequest: (state, action) => {
            state.loadingCreateRequest = action.payload
        },
        setLoadingEditRequest: (state, action) => {
            state.loadingEditRequest = action.payload;
        },
        setLevelOptions: (state, action) => {
            state.levelOptions = action.payload
        },
        setStatusOptions: (state, action) => {
            state.statusOptions = action.payload
        }
    }
})

export const { 
    setRequests,
    setLoadingRequestsList,
    setRequest,
    setLoadingRequest,
    setLoadingCreateRequest,
    setLoadingEditRequest,
    setLevelOptions,
    setStatusOptions
} = requestSlice.actions;

export const requestsReducer = requestSlice.reducer;
