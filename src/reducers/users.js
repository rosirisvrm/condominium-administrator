import { actionsTypes } from "../actions/types";

const initialState = {
    users: [],
    user: null,
    loading: false,
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
    [actionsTypes.SET_LOADING]: {
        ...state, 
        loading: payload
    },
})
  
export const usersReducer = (state = initialState, action) => {
    return reducerObject(state, action.payload)[action.type] || state;
}