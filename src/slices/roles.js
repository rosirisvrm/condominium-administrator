import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rolesList: [],
    loadingRolesList: false,
    roleStatusOptions: [],
    permissionsStatusOptions: [],
    moduleStatusOptions: [],
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
        setPermissionsStatusOptions: (state, action) => {
            state.permissionsStatusOptions = action.payload;
        },
        setModuleStatusOptions: (state, action) => {
            state.moduleStatusOptions = action.payload;
        },
        setRoleStatusOptions: (state, action) => {
            state.roleStatusOptions = action.payload
        }
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
    setRoleStatusOptions,
    setPermissionsStatusOptions,
    setModuleStatusOptions,
    // setEmployee,
    // setLoadingEmployee,
    // setLoadingCreateEmployee,
    // setLoadingEditEmployee,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;
