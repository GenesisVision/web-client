import { createStore, applyMiddleware, compose } from "redux";
import { loadingBarMiddleware } from "react-redux-loading-bar";
import { routerMiddleware } from "react-router-redux";
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import history from "../utils/history";
import rootReducer from "../reducers";
import apiErrorHandlerMiddleware from "../shared/middlewares/api-error-handler-middleware/api-error-handler-middleware";
import refreshTokenMiddleware from "../shared/middlewares/refresh-token-middleware/refresh-token-middleware";
import authService from "../services/authService";
import SwaggerInvestorApi from "../services/api-client/swagger-investor-api";

const failureSuffix = "FAILURE";
const suffixes = ["REQUEST", "SUCCESS", failureSuffix];

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  refreshTokenMiddleware(
    authService,
    SwaggerInvestorApi.apiInvestorAuthUpdateTokenGet.bind(SwaggerInvestorApi)
  ),
  promiseMiddleware({ promiseTypeSuffixes: suffixes }),
  apiErrorHandlerMiddleware({ failureSuffix: failureSuffix }),
  routerMiddleware(history),
  loadingBarMiddleware({
    promiseTypeSuffixes: suffixes
  })
];

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;
