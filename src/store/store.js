import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";


const composeEnhancers = (/* process.env.NODE_ENV === 'development' && */ typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    root:rootReducer 
});

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
