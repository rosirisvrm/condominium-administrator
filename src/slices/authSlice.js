import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loadingLogin: false,
    loadingLogout: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
        },
        setLoadingLogin: (state, action) => {
            state.loadingLogin = action.payload;
        },
        setLoadingLogout: (state, action) => {
            state.loadingLogout = action.payload;
        },
    }
})

export const { 
    setAuth,
    setLoadingLogin,
    setLoadingLogout
} = authSlice.actions;

export const authReducer = authSlice.reducer;
