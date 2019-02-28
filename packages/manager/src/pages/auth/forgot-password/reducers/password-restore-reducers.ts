import { combineReducers } from "redux";
import { DeepReadonly } from "utility-types";

import forgotPasswordReducer, {
  ForgotPasswordState
} from "./forgot-password-reducer";
import passwordRestoreReducer, {
  PasswordRestoreState
} from "./password-restore-reducer";

export type PasswordState = DeepReadonly<{
  forgot: ForgotPasswordState;
  restore: PasswordRestoreState;
}>;

export default combineReducers<PasswordState>({
  forgot: forgotPasswordReducer,
  restore: passwordRestoreReducer
});
