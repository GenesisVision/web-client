import { loadingBarMiddleware } from "react-redux-loading-bar";
import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import debounceMiddleware from "redux-debounced";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";
import authApi from "services/api-client/auth-api";
import { updateAccountCurrencyMiddleware } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";

import rootReducer from "../reducers";
import authService from "../services/auth-service";
import apiErrorHandlerMiddleware from "../shared/middlewares/api-error-handler-middleware/api-error-handler-middleware";
import clearOnceMetaMiddleware from "../shared/middlewares/clear-once-meta-middleware/clear-once-meta-middleware";
import refreshTokenMiddleware from "../shared/middlewares/refresh-token-middleware/refresh-token-middleware";
import {
  FAILURE_SUFFIX,
  REQUEST_SUFFIX,
  SUCCESS_SUFFIX
} from "../shared/reducers/api-reducer/api-reducer";
import history from "../utils/history";

const suffixes = [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAILURE_SUFFIX];

const reduxDevTools =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const initialState = {};
const enhancers = [];
if (reduxDevTools) {
  enhancers.push(reduxDevTools);
}
const middleware = [
  debounceMiddleware(),
  clearOnceMetaMiddleware(),
  thunk,
  refreshTokenMiddleware(
    authService,
    authApi.v10AuthTokenUpdatePost.bind(authApi)
  ),
  promiseMiddleware({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: FAILURE_SUFFIX }),
  routerMiddleware(history),
  loadingBarMiddleware({
    promiseTypeSuffixes: suffixes
  }),
  updateAccountCurrencyMiddleware
];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
