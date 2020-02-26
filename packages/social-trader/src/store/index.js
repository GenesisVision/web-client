import apiErrorHandlerMiddleware from "middlewares/api-error-handler-middleware/api-error-handler-middleware";
import refreshTokenMiddleware from "middlewares/refresh-token-middleware/refresh-token-middleware";
import { updateAccountCurrencyMiddleware } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
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
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";

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
  refreshTokenMiddleware(authService, authApi.updateAuthToken.bind(authApi)),
  createPromise({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: FAILURE_SUFFIX }),
  updateAccountCurrencyMiddleware
];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

export const initializeStore = (initialState = undefined) =>
  createStore(rootReducer, initialState, composedEnhancers);

const store = initializeStore();

export default store;
