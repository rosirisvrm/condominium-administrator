import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    user: null,
    loadingUsersList: false,
    loadingUser: false,
    loadingCreateUser: false,
    loadingEditUser: false,
    roleOptions: []
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setLoadingUsersList: (state, action) => {
            state.loadingUsersList = action.payload;
        },
         setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoadingUser: (state, action) => {
            state.loadingUser = action.payload;
        },
        setLoadingCreateUser: (state, action) => {
            state.loadingCreateUser = action.payload
        },
        setLoadingEditUser: (state, action) => {
            state.loadingEditUser = action.payload;
        },
        setRoleOptions: (state, action) => {
            state.roleOptions = action.payload
        }
    }
})

export const { 
    setUsers,
    setLoadingUsersList,
    setUser,
    setLoadingUser,
    setLoadingCreateUser,
    setLoadingEditUser,
    setRoleOptions
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
