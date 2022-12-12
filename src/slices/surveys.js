import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    surveysList: [],
    survey: null,
    loadingSurveysList: false,
    loadingSurvey: false,
    loadingCreateSurvey: false,
    loadingEditSurvey: false,
    statusOptions: []
}

export const surveysSlice = createSlice({
    name: 'surveys',
    initialState,
    reducers: {
        setSurveys: (state, action) => {
            state.surveysList = action.payload;
        },
        setLoadingSurveysList: (state, action) => {
            state.loadingSurveysList = action.payload;
        },
        setSurvey: (state, action) => {
            state.survey = action.payload;
        },
        setLoadingSurvey: (state, action) => {
            state.loadingSurvey = action.payload;
        },
        setLoadingCreateSurvey: (state, action) => {
            state.loadingCreateSurvey = action.payload
        },
        setLoadingEditSurvey: (state, action) => {
            state.loadingEditSurvey = action.payload;
        },
        setStatusOptions: (state, action) => {
            state.statusOptions = action.payload
        }
    }
})

export const { 
    setSurveys,
    setLoadingSurveysList,
    setSurvey,
    setLoadingSurvey,
    setLoadingCreateSurvey,
    setLoadingEditSurvey,
    setLevelOptions,
    setStatusOptions
} = surveysSlice.actions;

export const surveysReducer = surveysSlice.reducer;