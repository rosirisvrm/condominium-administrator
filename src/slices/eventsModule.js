import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    eventsModuleList: [],
    loadingEventsModuleList: false,
    // employee: null,
    // loadingEmployee: false,
    // loadingCreateEmployee: false,
    // loadingEditEmployee: false,
}

export const eventsModuleSlice = createSlice({
    name: 'eventsModule',
    initialState,
    reducers: {
        setEventsModule: (state, action) => {
            state.eventsModuleList = action.payload;
        },
        setLoadingEventsModuleList: (state, action) => {
            state.loadingEventsModuleList = action.payload;
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
    setEventsModule,
    setLoadingEventsModuleList,
    // setEmployee,
    // setLoadingEmployee,
    // setLoadingCreateEmployee,
    // setLoadingEditEmployee,
} = eventsModuleSlice.actions;

export const eventsModuleReducer = eventsModuleSlice.reducer;
