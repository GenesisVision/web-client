import { LoginViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { LOGIN } from "../actions/login.actions";
import twoFactorReducer, { ITwoFactorReducer } from "./two-factor.reducer";

export interface ILoginReducer {
  login: IApiReducerFactory<LoginViewModel>;
  twoFactor: ITwoFactorReducer;
}

export default combineReducers<ILoginReducer>({
  login: apiReducerFactory({ apiType: LOGIN }),
  twoFactor: twoFactorReducer
});
