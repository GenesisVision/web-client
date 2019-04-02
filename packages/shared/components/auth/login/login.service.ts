import { push } from "connected-react-router";

import { LOGIN_ROUTE } from "./constants";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/login/login.routes";
import platformApi from "../../../services/api-client/platform-api";
import authService from "../../../services/auth-service";
import authActions from "../../../actions/auth-actions";
import { setTwoFactorRequirement } from "../../../actions/2fa-actions";
import { CLIENT_WEB } from "manager-web-portal/src/pages/auth/login/services/login.service";
import { Dispatch } from "redux";
import { LOGIN, LOGIN_TWO_FACTOR, storeTwoFactor } from "./login.actions";
import clearDataActionFactory from "../../../actions/clear-data.factory";
import { HOME_ROUTE } from "pages/app/app.routes";
import SHA256 from "sha256";

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
  while (
    SHA256(`${prefix}${nonce}${login}`) >=
    "0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"
  ) {
    console.log(SHA256(`${prefix}${nonce}${login}`));
    prefix++;
  }
  console.log("it - ", SHA256(`${prefix}${nonce}${login}`));
  return prefix;
};

export const sharedLogin = (
  loginData: { email: string; password: string },
  from: string,
  setSubmitting: any,
  dispatch: Dispatch,
  loginUserMethod: any
) => {
  return platformApi
    .v10PlatformRiskcontrolGet(loginData.email, { device: CLIENT_WEB })
    .then(response => {
      const prefix = calculateHash({
        ...response.loginCheckDetails.details,
        login: loginData.email
      });
      return;
      /*return dispatch(
        loginUserMethod({ ...loginData, client: CLIENT_WEB, prefix })
      );*/
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
