import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visits: [],
    loadingVisitsList: false,
    // employee: null,
    // loadingEmployee: false,
    // loadingCreateEmployee: false,
    // loadingEditEmployee: false,
}

export const visitsSlice = createSlice({
    name: 'visits',
    initialState,
    reducers: {
        setVisits: (state, action) => {
            state.visitsList = action.payload;
        },
        setLoadingVisitsList: (state, action) => {
            state.loadingVisitsList = action.payload;
        },
        // setEmployee: (state, action) => {
        //     state.employee = action.payload;
        // },
        // setLoadingEmployee: (state, action) => {
        //     state.loadingEmployee = action.payload;
        // },
        // setLoadingCreateEmployee: (state, action) => {
        //     state.loadingCreateEmployee = action.payload
        // },
        // setLoadingEditEmployee: (state, action) => {
        //     state.loadingEditEmployee = action.payload;
        // }
    }
})

export const { 
    setVisits,
    setLoadingVisitsList,
    // setEmployee,
    // setLoadingEmployee,
    // setLoadingCreateEmployee,
    // setLoadingEditEmployee,
} = visitsSlice.actions;

export const visitsReducer = visitsSlice.reducer;
