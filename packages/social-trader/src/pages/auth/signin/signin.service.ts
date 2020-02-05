import { setTwoFactorRequirementAction } from "actions/2fa-actions";
import { updateAccountSettingsCurrencyAction } from "actions/account-settings-actions";
import authActions from "actions/auth-actions";
import clearDataActionFactory from "actions/clear-data.factory";
import platformActions from "actions/platform-actions";
import { windowResizeAction } from "actions/ui-actions";
import { Push } from "components/link/link";
import { CaptchaCheckResult } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import Router from "next/router";
import { DEFAULT_ACCOUNT_CURRENCY } from "reducers/account-settings-reducer";
import { Dispatch } from "redux";
import { HOME_ROUTE } from "routes/app.routes";
import authService from "services/auth-service";
import { removeCookie } from "utils/cookie";
import { ResponseError, SetSubmittingType } from "utils/types";

import {
  CODE_TYPE,
  LOGIN,
  LOGIN_TWO_FACTOR,
  storeTwoFactorAction
} from "./signin.actions";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "./signin.constants";

export const client = "Web";

export const login: LoginFuncType = (method, fromPath, type) => (
  dispatch,
  getState
) => (props, setSubmitting) => {
  const { code, captchaCheckResult } = props;
  const stateLoginData = getState().loginData.twoFactor;
  const email = props.email || stateLoginData.email;
  const password = props.password || stateLoginData.password;
  const from = fromPath || stateLoginData.from;
  return dispatch(
    method({
      email,
      password,
      client,
      twoFactorCode: (type === CODE_TYPE.TWO_FACTOR && code) || null,
      recoveryCode: (type === CODE_TYPE.RECOVERY && code) || null,
      captchaCheckResult
    })
  )
    .then((response: { value: string }) => {
      authService.storeToken(response.value);
      dispatch(authActions.updateTokenAction(true));
      if (type) dispatch(clearTwoFactorData());
      Router.push(from);
    })
    .catch((e: ResponseError) => {
      if (e.code === "RequiresTwoFactor") {
        dispatch(
          storeTwoFactorAction({
            email,
            password,
            from
          })
        );
        dispatch(setTwoFactorRequirementAction(true));
        Push(LOGIN_ROUTE_TWO_FACTOR_ROUTE);
      } else {
        setSubmitting!(false);
      }
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
  dispatch(windowResizeAction());
};

export type LoginFuncType = (
  method: any,
  from?: string,
  type?: CODE_TYPE
) => (
  dispatch: any,
  getState: any
) => (
  props: {
    captchaCheckResult: CaptchaCheckResult;
    id: string;
    prefix?: number;
    email: string;
    password: string;
    method: any;
    code: string;
    from?: string;
  },
  setSubmitting?: SetSubmittingType
) => Promise<void>;

export type clearLoginDataFuncType = (dispatch: Dispatch) => void;
type clearTwoFactorDataFuncType = () => (dispatch: Dispatch) => void;
type logoutFuncType = (dispatch: Dispatch) => void;
