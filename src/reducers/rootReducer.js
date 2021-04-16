import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    //todo authReducer
    calendar: calendarReducer
    //todo calendarReducer
})