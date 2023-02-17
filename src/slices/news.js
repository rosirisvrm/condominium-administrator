import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    newsList: [],
    news: null,
    loadingNewsList: false,
    loadingNews: false,
    loadingCreateNews: false,
    loadingEditNews: false,
    loadingDeleteNews: false
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNewsList: (state, action) => {
            state.newsList = action.payload;
        },
        setLoadingNewsList: (state, action) => {
            state.loadingNewsList = action.payload;
        },
        setNews: (state, action) => {
            state.news = action.payload;
        },
        setLoadingNews: (state, action) => {
            state.loadingNews = action.payload;
        },
        setLoadingCreateNews: (state, action) => {
            state.loadingCreateNews = action.payload
        },
        setLoadingEditNews: (state, action) => {
            state.loadingEditNews = action.payload;
        },
        setLoadingDeleteNews: (state, action) => {
            state.loadingDeleteNews = action.payload;
        },
    }
})

export const { 
    setNewsList,
    setLoadingNewsList,
    setNews,
    setLoadingNews,
    setLoadingCreateNews,
    setLoadingEditNews,
    setLoadingDeleteNews
} = newsSlice.actions;

export const newsReducer = newsSlice.reducer;
