import { combineReducers } from "redux";

import forgotPasswordReducer, {
  ForgotPasswordState
} from "./forgot-password-reducer";
import passwordRestoreReducer, {
  PasswordRestoreState
} from "./password-restore-reducer";

export type PasswordState = Readonly<{
  forgot: ForgotPasswordState;
  restore: PasswordRestoreState;
}>;

export default combineReducers<PasswordState>({
  forgot: forgotPasswordReducer,
  restore: passwordRestoreReducer
});
