import { combineReducers } from "redux";
import { usersReducer } from "../slices/usersSlice";
import { requestsReducer } from "../slices/requestsSlice";

const rootReducer = combineReducers({
    users: usersReducer,
    requests: requestsReducer,
})

export { rootReducer };