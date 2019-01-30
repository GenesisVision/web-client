import { combineReducers } from "redux";
import { DeepReadonly } from "utility-types";

import forgotPasswordReducer, {
  IForgotPasswordState
} from "./forgot-password-reducer";
import passwordRestoreReducer, {
  IPasswordRestoreState
} from "./password-restore-reducer";

export type PasswordState = DeepReadonly<{
  forgot: IForgotPasswordState;
  restore: IPasswordRestoreState;
}>;

export default combineReducers<PasswordState>({
  forgot: forgotPasswordReducer,
  restore: passwordRestoreReducer
});
