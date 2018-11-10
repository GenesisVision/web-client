import authApi from "shared/services/api-client/auth-api";

export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";
export const TWO_FACTOR_CODE = "twoFactorCode";
export const RECOVERY_CODE = "recoveryCode";

export const loginUser = loginData => ({
  type: LOGIN,
  payload: authApi.v10AuthSigninManagerPost({
    model: loginData
  })
});

export const storeTwoFactor = ({ email, password, from }) => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});
