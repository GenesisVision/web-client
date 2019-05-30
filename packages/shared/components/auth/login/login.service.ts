import { push } from "connected-react-router";
import { Dispatch } from "redux";
import { setTwoFactorRequirement } from "shared/actions/2fa-actions";
import authActions from "shared/actions/auth-actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import platformActions from "shared/actions/platform-actions";
import { windowResize } from "shared/actions/ui-actions";
import { HOME_ROUTE } from "shared/routes/app.routes";
import authService from "shared/services/auth-service";
import { ResponseError, SetSubmittingType } from "shared/utils/types";

import {
  CODE_TYPE,
  LOGIN,
  LOGIN_TWO_FACTOR,
  storeTwoFactor
} from "./login.actions";
import { LOGIN_ROUTE, LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "./login.routes";

export const client = "Web";
export const redirectToLogin = () => {
  push(LOGIN_ROUTE);
};

export const login: LoginFuncType = props => (dispatch, getState) => {
  const { code, type, setSubmitting, method, prefix, id } = props;
  const stateLoginData = getState().loginData.twoFactor;
  const email = props.email || stateLoginData.email;
  const password = props.password || stateLoginData.password;
  const from = props.from || stateLoginData.from;
  return dispatch(
    method({
      email,
      password,
      client,
      twoFactorCode: (type === CODE_TYPE.TWO_FACTOR && code) || null,
      recoveryCode: (type === CODE_TYPE.RECOVERY && code) || null,
      captchaCheckResult: {
        id,
        pow: {
          prefix
        }
      }
    })
  )
    .then((response: { value: string }) => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      if (type) dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch((e: ResponseError) => {
      if (e.code === "RequiresTwoFactor") {
        dispatch(
          storeTwoFactor({
            email,
            password,
            from
          })
        );
        dispatch(setTwoFactorRequirement(true));
        dispatch(push(LOGIN_ROUTE_TWO_FACTOR_ROUTE));
      } else {
        setSubmitting!(false);
      }
    });
};

export const clearLoginData: clearLoginDataFuncType = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

export const clearTwoFactorData: clearTwoFactorDataFuncType = () => dispatch => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};

export const logout: logoutFuncType = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.logout());
  dispatch(platformActions.fetchPlatformSettings);
  dispatch(windowResize());
  dispatch(push(HOME_ROUTE));
};

export type LoginFuncType = (
  props: {
    id: string;
    prefix?: number;
    email: string;
    password: string;
    method: any;
    code: string;
    setSubmitting?: SetSubmittingType;
    type?: CODE_TYPE;
    from?: string;
  }
) => (dispatch: any, getState: any) => Promise<void>;
export type clearLoginDataFuncType = () => (dispatch: Dispatch) => void;
type clearTwoFactorDataFuncType = () => (dispatch: Dispatch) => void;
type logoutFuncType = () => (dispatch: Dispatch) => void;

export interface LoginService {
  login: LoginFuncType;
  clearLoginData: clearLoginDataFuncType;
  clearTwoFactorData: clearTwoFactorDataFuncType;
  logout: logoutFuncType;
}
