import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import alertMessagesReducer from "../shared/alert-message/reducers";
import authReducer from "./authReducer";
import investorProfitReducer from "./investorProfitReducer";
import loginReducer from "../shared/login/reducers";
import registerReducer from "../shared/register/reducers";
import traderReducer from "./traderReducer";
import tradersReducer from "./tradersReducer";

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  loadingBar: loadingBarReducer,
  tradersInfo: tradersReducer,
  traderData: traderReducer,
  investorProfit: investorProfitReducer,
  loginData: loginReducer,
  registerData: registerReducer,
  authData: authReducer,
  alertMessages: alertMessagesReducer
});
