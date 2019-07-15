import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, compose, createStore } from "redux";
import debounceMiddleware from "redux-debounced";
import { composeWithDevTools } from "redux-devtools-extension";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";
import apiErrorHandlerMiddleware from "shared/middlewares/api-error-handler-middleware/api-error-handler-middleware";
import clearOnceMetaMiddleware from "shared/middlewares/clear-once-meta-middleware/clear-once-meta-middleware";
import gtmMiddleware from "shared/middlewares/gtm-middleware/gtm-middleware";
import refreshTokenMiddleware from "shared/middlewares/refresh-token-middleware/refresh-token-middleware";
import { updateAccountCurrencyMiddleware } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX,
  SUCCESS_SUFFIX
} from "shared/reducers/reducer-creators/api-reducer";
import authApi from "shared/services/api-client/auth-api";
import authService from "shared/services/auth-service";

import rootReducer from "../reducers";
// import history from "shared/utils/history";


const suffixes = [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX];

const reduxDevTools = process.env.NODE_ENV === false;

const initialState = {};
const enhancers = [];
if (reduxDevTools) {
  enhancers.push(reduxDevTools);
}
const middleware = [
  debounceMiddleware(),
  gtmMiddleware(),
  clearOnceMetaMiddleware(),
  thunk,
  refreshTokenMiddleware(
    authService,
    authApi.v10AuthTokenUpdatePost.bind(authApi)
  ),
  createPromise({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: FAILURE_SUFFIX }),
  // routerMiddleware(history),
  updateAccountCurrencyMiddleware
];

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
