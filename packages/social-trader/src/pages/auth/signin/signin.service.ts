import authActions from "actions/auth-actions";
import platformActions from "actions/platform-actions";
import { Push } from "components/link/link";
import { CaptchaCheckResult, LoginViewModel } from "gv-api-web";
import { useCookieState } from "hooks/cookie-state";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { HOME_ROUTE } from "routes/app.routes";
import { api } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import { cleanAccountCurrency } from "utils/account-currency";

export enum CODE_TYPE {
  TWO_FACTOR = "twoFactorCode",
  RECOVERY = "recoveryCode"
}

export const TWO_FACTOR_KEY = "TWO_FACTOR_KEY";
export const THREE_FACTOR_KEY = "THREE_FACTOR_KEY";

export const client = "Web";

export const loginMethod = (body: LoginViewModel) =>
  api.auth().authorize({
    body
  });

export const login: LoginFuncType = ({
  email,
  password,
  code,
  captchaCheckResult,
  rememberMe = false,
  type
}) => {
  return loginMethod({
    rememberMe,
    email,
    password,
    client,
    twoFactorCode: (type === CODE_TYPE.TWO_FACTOR && code) || "",
    recoveryCode: (type === CODE_TYPE.RECOVERY && code) || "",
    captchaCheckResult
  });
};

export const logout: logoutFuncType = dispatch => {
  Push(HOME_ROUTE);
  authService.removeToken();
  cleanAccountCurrency();
  dispatch(authActions.updateTokenAction(false));
  dispatch(platformActions.fetchPlatformSettings());
};

export const initialTwoFactorState = {
  email: "",
  password: "",
  from: { HOME_ROUTE }
};

export type TwoFactorStateType = {
  email: string;
  password?: string;
  from?: string | object;
};

export const useTwoFactorState = (ctx?: NextPageContext) => {
  const { clear, get, set } = useCookieState<TwoFactorStateType>({
    ctx,
    initialState: initialTwoFactorState,
    key: TWO_FACTOR_KEY
  });
  return {
    clearTwoFactorState: clear,
    storeTwoFactorState: set,
    getTwoFactorState: get
  };
};

export const initialThreeFactorState = {
  email: "test@email.com",
  tempToken: "",
  from: { HOME_ROUTE }
};

export type ThreeFactorStateType = {
  email: string;
  tempToken: string;
  from?: string | object;
};

export const useThreeFactorState = (ctx?: NextPageContext) => {
  const { clear, get, set } = useCookieState<ThreeFactorStateType>({
    ctx,
    initialState: initialThreeFactorState,
    key: THREE_FACTOR_KEY
  });
  return {
    clearThreeFactorState: clear,
    storeThreeFactorState: set,
    getThreeFactorState: get
  };
};

export type LoginFuncType = (props: {
  type?: CODE_TYPE;
  rememberMe?: boolean;
  captchaCheckResult: CaptchaCheckResult;
  id: string;
  prefix?: number;
  email: string;
  password: string;
  method: any;
  code: string;
}) => Promise<string>;

type logoutFuncType = (dispatch: Dispatch) => void;
