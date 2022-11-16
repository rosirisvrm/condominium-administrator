import { combineReducers } from "redux";
import { usersReducer } from "../slices/usersSlice";
import { requestsReducer } from "../slices/requestsSlice";
import { authReducer } from "../slices/authSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    requests: requestsReducer,
})

export { rootReducer };