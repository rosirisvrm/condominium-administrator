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

export const setLoading = (payload) => ({
    type: actionsTypes.SET_LOADING,
    payload,
})