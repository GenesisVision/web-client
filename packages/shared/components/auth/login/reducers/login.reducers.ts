import { LoginViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { LOGIN } from "shared/components/auth/login/login.actions";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

import twoFactorReducer, { ITwoFactorState } from "./two-factor.reducer";

export type LoginState = Readonly<{
  login: IApiState<LoginViewModel>;
  twoFactor: ITwoFactorState;
}>;

const loginReducer = combineReducers<LoginState>({
  login: apiReducerFactory({ apiType: LOGIN }),
  twoFactor: twoFactorReducer
});

export default loginReducer;
