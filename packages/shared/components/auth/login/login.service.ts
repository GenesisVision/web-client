import { push } from "connected-react-router";

import { LOGIN_ROUTE, LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "./login.routes";
import platformApi from "shared/services/api-client/platform-api";
import authService from "shared/services/auth-service";
import authActions from "shared/actions/auth-actions";
import { setTwoFactorRequirement } from "shared/actions/2fa-actions";
import { Dispatch } from "redux";
import {
  CODE_TYPE,
  LOGIN,
  LOGIN_TWO_FACTOR,
  storeTwoFactor
} from "./login.actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import { HOME_ROUTE } from "shared/routes/app.routes";
import SHA256 from "sha256";

export const CLIENT_WEB = "Web";
export const redirectToLogin = () => {
  push(LOGIN_ROUTE);
};

export const calculateHash = ({
  difficulty,
  nonce,
  login
}: {
  difficulty: number;
  nonce: string;
  login: string;
}): number => {
  let prefix = 0;
  const diffString =
    Array(difficulty)
      .fill(0)
      .join("") +
    Array(64 - difficulty)
      .fill("F")
      .join("");
  while (SHA256(`${prefix}${nonce}${login}`) >= diffString) prefix++;
  return prefix;
};

export const login = (
  loginData: { email: string; password: string },
  from: string,
  setSubmitting: any,
  loginUserMethod: any
) => (dispatch: Dispatch) => {
  return platformApi
    .v10PlatformRiskcontrolGet(loginData.email, { device: CLIENT_WEB })
    .then(response => {
      const { loginCheckDetails, id } = response;
      const prefix = calculateHash({
        ...loginCheckDetails.details,
        login: loginData.email
      });
      return dispatch(
        loginUserMethod({
          ...loginData,
          client: CLIENT_WEB,
          prefix,
          captchaId: id
        })
      );
    })
    .then((response: any) => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(from));
    })
    .catch(e => {
      if (e.code === "RequiresTwoFactor") {
        dispatch(
          storeTwoFactor({
            ...loginData,
            from
          })
        );
        dispatch(setTwoFactorRequirement(true));
        dispatch(push(LOGIN_ROUTE_TWO_FACTOR_ROUTE));
      } else {
        setSubmitting(false);
      }
    });
};

export const twoFactorLogin = (
  code: string,
  type: CODE_TYPE,
  setSubmitting: any,
  loginUserMethod: any
) => (dispatch: any, getState: any) => {
  const { email, password, from } = getState().loginData.twoFactor;
  const model = {
    email,
    password,
    client: CLIENT_WEB,
    twoFactorCode: "",
    recoveryCode: ""
  };
  if (type === CODE_TYPE.TWO_FACTOR) {
    model.twoFactorCode = code;
  }
  if (type === CODE_TYPE.RECOVERY) {
    model.recoveryCode = code;
  }

  const request = dispatch(loginUserMethod(model));

  request
    .then((response: { value: string }) => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch(() => setSubmitting(false));

  return request;
};

export const clearLoginData = () => (dispatch: Dispatch) => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

export const clearTwoFactorData = () => (dispatch: Dispatch) => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};

export const logout = () => (dispatch: Dispatch) => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  dispatch(push(HOME_ROUTE));
};
