import { actionsTypes } from "./types"

export const setUsers = (payload) => ({
    type: actionsTypes.SET_USERS,
    payload,
})

export const setUser = (payload) => ({
    type: actionsTypes.SET_USER,
    payload,
})

export const setRoleOptions = (payload) => ({
    type: actionsTypes.SET_ROLE_OPTIONS,
    payload,
})

export const setLoadingUsersList = (payload) => ({
    type: actionsTypes.SET_LOADING_USERS_LIST,
    payload,
})

export const setLoadingCreateUser = (payload) => ({
    type: actionsTypes.SET_LOADING_CREATE_USER,
    payload,
})

export const setLoadingEditUser = (payload) => ({
    type: actionsTypes.SET_LOADING_EDIT_USER,
    payload,
})

export const setLoadingUser = (payload) => ({
    type: actionsTypes.SET_LOADING_USER,
    payload,
})