import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { countReducer } from "./reducers";

export const initialState = { news: {}, numberOfCalls: 0 };

export const store = createStore(countReducer, applyMiddleware(thunk));
