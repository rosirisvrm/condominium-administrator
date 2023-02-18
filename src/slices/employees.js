import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employeesList: [],
    employee: null,
    loadingEmployeesList: false,
    loadingEmployee: false,
    loadingCreateEmployee: false,
    loadingEditEmployee: false,
    loadingDeleteEmployee: false,
    loadingDownloadEmployee: false,
}

export const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setEmployees: (state, action) => {
            state.employeesList = action.payload;
        },
        setLoadingEmployeesList: (state, action) => {
            state.loadingEmployeesList = action.payload;
        },
        setEmployee: (state, action) => {
            state.employee = action.payload;
        },
        setLoadingEmployee: (state, action) => {
            state.loadingEmployee = action.payload;
        },
        setLoadingCreateEmployee: (state, action) => {
            state.loadingCreateEmployee = action.payload
        },
        setLoadingEditEmployee: (state, action) => {
            state.loadingEditEmployee = action.payload;
        },
        setLoadingDeleteEmployee: (state, action) => {
            state.loadingDeleteEmployee = action.payload;
        },
        setLoadingDownloadEmployee: (state, action) => {
            state.loadingDownloadEmployee = action.payload;
        }
    }
})

export const { 
    setEmployees,
    setLoadingEmployeesList,
    setEmployee,
    setLoadingEmployee,
    setLoadingCreateEmployee,
    setLoadingEditEmployee,
    setLoadingDeleteEmployee,
    setLoadingDownloadEmployee
} = employeesSlice.actions;

export const employeesReducer = employeesSlice.reducer;
