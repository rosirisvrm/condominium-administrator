import { combineReducers } from "redux";
import { usersReducer } from "../slices/usersSlice";
import { requestsReducer } from "../slices/requestsSlice";
import { authReducer } from "../slices/authSlice";
import { accountingReducer } from "../slices/accountingSlice";
import { customSettingsReducer } from "src/slices/customSettings";
import { surveysReducer } from "src/slices/surveys";

const rootReducer = combineReducers({
    auth: authReducer,
    customSettings: customSettingsReducer,
    accounting: accountingReducer,
    users: usersReducer,
    requests: requestsReducer,
    surveys: surveysReducer,
})

export { rootReducer };