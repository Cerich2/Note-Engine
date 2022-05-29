import { combineReducers, createStore } from "redux";
import snackbarReducer from "./reducer/snackbar";

const reducer = combineReducers({
  snackbar: snackbarReducer
});

const store = createStore(reducer, {});

export default store;
