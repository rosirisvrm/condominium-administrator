import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    previous: ''
}

export const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setPrevious: (state, action) => {
            state.previous = action.payload;
        },
    }
})

export const { 
    setPrevious
} = routesSlice.actions;

export const routesReducer = routesSlice.reducer;
