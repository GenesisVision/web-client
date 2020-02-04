import { LoginViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";

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
