import { LoginViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";

import { LOGIN } from "../signin.actions";
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
