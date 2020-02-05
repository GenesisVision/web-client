import { ForgotPasswordViewModel } from "gv-api-web";
import { FORGOT_PASSWORD } from "pages/auth/forgot-password/actions/forgot-password.actions";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

export type ForgotPasswordState = IApiState<ForgotPasswordViewModel>;

const forgotPasswordReducer = apiReducerFactory<ForgotPasswordViewModel>({
  apiType: FORGOT_PASSWORD
});

export default forgotPasswordReducer;
