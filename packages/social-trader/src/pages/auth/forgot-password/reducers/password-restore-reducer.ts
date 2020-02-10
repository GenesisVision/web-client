import { ResetPasswordViewModel } from "gv-api-web";
import { PASSWORD_RESTORE } from "pages/auth/forgot-password/actions/forgot-password.actions";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

export type PasswordRestoreState = IApiState<ResetPasswordViewModel>;

const passwordRestoreReducer = apiReducerFactory<ResetPasswordViewModel>({
  apiType: PASSWORD_RESTORE
});
export default passwordRestoreReducer;
