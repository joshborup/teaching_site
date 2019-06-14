import { createStore, combineReducers } from "redux";
import userReducer from "./userReducer";
import courseReducer from "./courseReducer";

const rootReducer = combineReducers({
  userDux: userReducer,
  courseDux: courseReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
