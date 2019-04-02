import { LoginViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import twoFactorReducer, { ITwoFactorReducer } from "./two-factor.reducer";
import { LOGIN } from "shared/components/auth/login/login.actions";

export type LoginState = Readonly<{
  login: IApiState<LoginViewModel>;
  twoFactor: ITwoFactorReducer;
}>;

export default combineReducers<LoginState>({
  login: apiReducerFactory({ apiType: LOGIN }),
  twoFactor: twoFactorReducer
});
