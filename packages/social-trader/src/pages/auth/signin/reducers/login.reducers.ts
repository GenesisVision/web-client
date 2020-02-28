import { combineReducers } from "redux";

import twoFactorReducer, { ITwoFactorState } from "./two-factor.reducer";

export type LoginState = Readonly<{
  twoFactor: ITwoFactorState;
}>;

const loginReducer = combineReducers<LoginState>({
  twoFactor: twoFactorReducer
});

export default loginReducer;
