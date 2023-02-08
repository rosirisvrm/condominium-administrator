import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rolesList: [],
    loadingRolesList: false,
    roleStatusOptions: [],
    permissionsStatusOptions: [],
    moduleStatusOptions: [],
    role: null,
    loadingRole: false,
    loadingCreateRole: false,
    loadingEditRole: false,
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
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setLoadingRole: (state, action) => {
            state.loadingRole = action.payload;
        },
        setLoadingCreateRole: (state, action) => {
            state.loadingCreateRole = action.payload
        },
        setLoadingEditRole: (state, action) => {
            state.loadingEditRole = action.payload;
        }
    }
})

export const { 
    setRoles,
    setLoadingRolesList,
    setRoleStatusOptions,
    setPermissionsStatusOptions,
    setModuleStatusOptions,
    setRole,
    setLoadingRole,
    setLoadingCreateRole,
    setLoadingEditRole,
} = rolesSlice.actions;

export const rolesReducer = rolesSlice.reducer;
