import { FORGOT_PASSWORD } from "components/auth/forgot-password/actions/forgot-password.actions";
import { ForgotPasswordViewModel } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";

export type ForgotPasswordState = IApiState<ForgotPasswordViewModel>;

const forgotPasswordReducer = apiReducerFactory<ForgotPasswordViewModel>({
  apiType: FORGOT_PASSWORD
});

export default forgotPasswordReducer;
