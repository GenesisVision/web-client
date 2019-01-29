import { combineReducers } from "redux";

import forgotPasswordReducer, {
  IForgotPasswordReducer
} from "./forgot-password-reducer";
import passwordRestoreReducer, {
  IPasswordRestoreReducer
} from "./password-restore-reducer";

export interface IPasswordRestoreReducers {
  forgot: IForgotPasswordReducer;
  restore: IPasswordRestoreReducer;
}

const passwordRestoreReducers = combineReducers<IPasswordRestoreReducers>({
  forgot: forgotPasswordReducer,
  restore: passwordRestoreReducer
});

export default passwordRestoreReducers;
