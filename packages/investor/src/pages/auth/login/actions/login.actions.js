import authApi from "shared/services/api-client/auth-api";
import { LOGIN } from "shared/components/auth/login/login.actions";

export const loginUser = loginData => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninInvestorPost({
    model: loginData
  })
});
