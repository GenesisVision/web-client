import { ResetPasswordViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { PASSWORD_RESTORE } from "../actions/forgot-password.actions";

export interface IPasswordRestoreReducer
  extends IApiReducerFactory<ResetPasswordViewModel> {}

const passwordRestoreReducer = apiReducerFactory<ResetPasswordViewModel>({
  apiType: PASSWORD_RESTORE
});

export default passwordRestoreReducer;
