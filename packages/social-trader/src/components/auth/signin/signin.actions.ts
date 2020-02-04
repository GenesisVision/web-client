import { LoginViewModel } from "gv-api-web";
import authApi from "services/api-client/auth-api";
import { ActionType, ApiAction } from "utils/types";

import { ITwoFactorState } from "./reducers/two-factor.reducer";

export const LOGIN = "LOGIN";
export const LOGIN_TWO_FACTOR = "LOGIN_TWO_FACTOR";

export enum CODE_TYPE {
  TWO_FACTOR = "twoFactorCode",
  RECOVERY = "recoveryCode"
}

export type TStoreTwoFactorAction = ActionType<ITwoFactorState>;
export const storeTwoFactorAction = ({
  email,
  password,
  from
}: ITwoFactorState): TStoreTwoFactorAction => ({
  type: LOGIN_TWO_FACTOR,
  payload: {
    email,
    password,
    from
  }
});

export const loginUserAction = (
  loginData: LoginViewModel
): ApiAction<string> => ({
  type: LOGIN,
  payload: authApi.authorize({
    body: loginData
  })
});
