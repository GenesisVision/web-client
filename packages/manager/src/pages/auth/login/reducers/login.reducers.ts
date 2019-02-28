import { LoginViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import { LOGIN } from "../actions/login.actions";
import twoFactorReducer, { ITwoFactorReducer } from "./two-factor.reducer";

export type LoginState = DeepReadonly<{
  login: IApiReducerFactory<LoginViewModel>;
  twoFactor: ITwoFactorReducer;
}>;

const loginReducer = combineReducers<LoginState>({
  login: apiReducerFactory({ apiType: LOGIN }),
  twoFactor: twoFactorReducer
});

export default loginReducer;
