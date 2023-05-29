import { combineReducers } from "redux";
import { usersReducer } from "../slices/usersSlice";
import { requestsReducer } from "../slices/requestsSlice";
import { authReducer } from "../slices/authSlice";
import { accountingReducer } from "../slices/accountingSlice";
import { customSettingsReducer } from "src/slices/customSettings";
import { surveysReducer } from "src/slices/surveys";
import { employeesReducer } from "src/slices/employees";
import { providersReducer } from "src/slices/providers";
import { newsReducer } from "src/slices/news";
import { rolesReducer } from "src/slices/roles";
import { eventsModuleReducer } from "src/slices/eventsModule";
import { visitsReducer } from "src/slices/visits";
import { notificationsReducer } from "src/slices/notifications";
import { paymentMethodsReducer } from "src/slices/paymentMethods";
import { routesReducer } from "../slices/routes";

const rootReducer = combineReducers({
    auth: authReducer,
    customSettings: customSettingsReducer,
    accounting: accountingReducer,
    users: usersReducer,
    requests: requestsReducer,
    surveys: surveysReducer,
    employees: employeesReducer,
    providers: providersReducer,
    news: newsReducer,
    roles: rolesReducer,
    eventsModule: eventsModuleReducer,
    visits: visitsReducer,
    notifications: notificationsReducer,
    paymentMethods: paymentMethodsReducer,
    routes: routesReducer,
})

export { rootReducer };