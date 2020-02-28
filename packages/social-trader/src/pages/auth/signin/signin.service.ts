import { updateAccountSettingsCurrencyAction } from "actions/account-settings-actions";
import authActions from "actions/auth-actions";
import clearDataActionFactory from "actions/clear-data.factory";
import platformActions from "actions/platform-actions";
import { Push } from "components/link/link";
import { CaptchaCheckResult, LoginViewModel } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { DEFAULT_ACCOUNT_CURRENCY } from "reducers/account-settings-reducer";
import { Dispatch } from "redux";
import { HOME_ROUTE } from "routes/app.routes";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { removeCookie } from "utils/cookie";

import { CODE_TYPE, LOGIN, LOGIN_TWO_FACTOR } from "./signin.actions";

export const client = "Web";

export const loginMethod = (body: LoginViewModel) =>
  authApi.authorize({
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

export const clearLoginData: clearLoginDataFuncType = dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

export const clearTwoFactorData: clearTwoFactorDataFuncType = () => dispatch => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};

export const logout: logoutFuncType = dispatch => {
  Push(HOME_ROUTE);
  authService.removeToken();
  removeCookie(ACCOUNT_CURRENCY_KEY);
  dispatch(updateAccountSettingsCurrencyAction(DEFAULT_ACCOUNT_CURRENCY));
  dispatch(authActions.updateTokenAction(false));
  dispatch(platformActions.fetchPlatformSettings());
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

export type clearLoginDataFuncType = (dispatch: Dispatch) => void;
type clearTwoFactorDataFuncType = () => (dispatch: Dispatch) => void;
type logoutFuncType = (dispatch: Dispatch) => void;
