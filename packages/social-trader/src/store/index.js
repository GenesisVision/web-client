import apiErrorHandlerMiddleware from "middlewares/api-error-handler-middleware/api-error-handler-middleware";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX,
  SUCCESS_SUFFIX
} from "reducers/reducer-creators/api-reducer";
import { applyMiddleware, createStore } from "redux";
import debounceMiddleware from "redux-debounced";
import { composeWithDevTools } from "redux-devtools-extension";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

const suffixes = [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX];

const reduxDevTools = process.env.NODE_ENV === false;

const enhancers = [];
if (reduxDevTools) {
  enhancers.push(reduxDevTools);
}
const middleware = [
  debounceMiddleware(),
  thunk,
  createPromise({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: FAILURE_SUFFIX })
];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export const initializeStore = (initialState = undefined) =>
  createStore(rootReducer, initialState, composedEnhancers);

const store = initializeStore();

export default store;
