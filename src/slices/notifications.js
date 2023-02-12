import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notificationsList: [],
    notification: null,
    loadingNotificationsList: false,
    loadingNotification: false,
    loadingCreateNotification: false,
    loadingEditNotification: false,
    loadingDeleteNotification: false,
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotificationsList: (state, action) => {
            state.notificationsList = action.payload;
        },
        setLoadingNotificationsList: (state, action) => {
            state.loadingNotificationsList = action.payload;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        setLoadingNotification: (state, action) => {
            state.loadingNotification = action.payload;
        },
        setLoadingCreateNotification: (state, action) => {
            state.loadingCreateNotification = action.payload
        },
        setLoadingEditNotification: (state, action) => {
            state.loadingEditNotification = action.payload;
        },
        setLoadingDeleteNotification: (state, action) => {
            state.loadingDeleteNotification = action.payload;
        }
    }
})

export const { 
    setNotificationsList,
    setLoadingNotificationsList,
    setNotification,
    setLoadingNotification,
    setLoadingCreateNotification,
    setLoadingEditNotification,
    setLoadingDeleteNotification
} = notificationSlice.actions;

export const notificationsReducer = notificationSlice.reducer;
