import authApi from "../../../services/api-client/auth-api";
import { LoginViewModel } from "gv-api-web";

export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";
export const TWO_FACTOR_CODE = "twoFactorCode";
export const RECOVERY_CODE = "recoveryCode";

export enum CODE_TYPE {
  TWO_FACTOR = "twoFactorCode",
  RECOVERY = "recoveryCode"
}

export const storeTwoFactor = ({
  email,
  password,
  from
}: {
  email: string;
  password: string;
  from: string;
}) => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});

export const loginUserManager = (loginData: LoginViewModel) => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninManagerPost({
    model: loginData
  })
});

export const loginUserInvestor = (loginData: LoginViewModel) => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninInvestorPost({
    model: loginData
  })
});
