import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rolesList: [],
    loadingRolesList: false,
    // employee: null,
    // loadingEmployee: false,
    // loadingCreateEmployee: false,
    // loadingEditEmployee: false,
}

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.rolesList = action.payload;
        },
        setLoadingRolesList: (state, action) => {
            state.loadingRolesList = action.payload;
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
    setRoles,
    setLoadingRolesList,
    // setEmployee,
    // setLoadingEmployee,
    // setLoadingCreateEmployee,
    // setLoadingEditEmployee,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;
