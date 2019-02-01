import { ForgotPasswordViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { FORGOT_PASSWORD } from "../actions/forgot-password.actions";

export type ForgotPasswordState = IApiReducerFactory<ForgotPasswordViewModel>;

const forgotPasswordReducer = apiReducerFactory<ForgotPasswordViewModel>({
  apiType: FORGOT_PASSWORD
});

export default forgotPasswordReducer;
