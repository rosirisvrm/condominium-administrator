import { combineReducers } from "redux";
import { usersReducer } from "../slices/usersSlice";
import { requestsReducer } from "../slices/requestsSlice";
import { authReducer } from "../slices/authSlice";
import { accountingReducer } from "../slices/accountingSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    accounting: accountingReducer,
    users: usersReducer,
    requests: requestsReducer,
})

export { rootReducer };