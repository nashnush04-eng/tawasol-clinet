import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./modules";
import { setAuthToken } from "../utils";

const initialState = {};

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

let currentState = store.getState();

store.subscribe(() => {
  const previousState = currentState;
  currentState = store.getState();

  if (previousState.users?.token !== currentState.users?.token) {
    const token = currentState.users?.token;
    setAuthToken(token);
  }
});

export default store;
