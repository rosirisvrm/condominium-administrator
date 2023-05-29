import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previous: '',
    newRegister: null,
}

export const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setPrevious: (state, action) => {
            state.previous = action.payload;
        },
        setNewRegister: (state, action) => {
            state.newRegister = action.payload;
        },
    }
})

export const { 
    setPrevious,
    setNewRegister
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;
