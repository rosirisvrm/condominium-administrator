import { actionsTypes } from "../actions/types";

const initialState = {
    users: [],
    user: null,
    loadingUsersList: false,
    loadingUser: false,
    loadingCreateUser: false,
    loadingEditUser: false,
    roleOptions: []
};

// export const usersReducer = (state = initialState, action) => {
//     switch(action.type){
//         case SET_USERS: 
//             return { ...state, users: action.payload };
//         case SET_LOADING: 
//             return { ...state, loading: action.payload };
//         default: 
//             return state;
//     }
// }

const reducerObject = (state, payload) => ({
    [actionsTypes.SET_USERS]: {
        ...state, 
        users: payload
    },
    [actionsTypes.SET_USER]: {
        ...state, 
        user: payload
    },
    [actionsTypes.SET_ROLE_OPTIONS]: {
        ...state, 
        roleOptions: payload
    },
    [actionsTypes.SET_LOADING_USERS_LIST]: {
        ...state, 
        loadingUsersList: payload
    },
    [actionsTypes.SET_LOADING_CREATE_USER]: {
        ...state, 
        loadingCreateUser: payload
    },
    [actionsTypes.SET_LOADING_EDIT_USER]: {
        ...state, 
        loadingEditUser: payload
    },
    [actionsTypes.SET_LOADING_USER]: {
        ...state,
        loadingUser: payload
    },
})
  
export const usersReducer = (state = initialState, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
}