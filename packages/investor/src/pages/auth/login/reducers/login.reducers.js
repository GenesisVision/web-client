import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { LOGIN } from "../actions/login.actions";
import twoFactorReducer from "./two-factor.reducer";

const loginReducer = combineReducers({
  login: apiReducerFactory({ apiType: LOGIN }),
  twoFactor: twoFactorReducer
});

export default loginReducer;
