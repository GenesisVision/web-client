import { HOME_ROUTE } from "pages/app/app.routes";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/login/login.routes";
import { push } from "react-router-redux";
import { setTwoFactorRequirement } from "shared/actions/2fa-actions";
import authActions from "shared/actions/auth-actions";
import clearDataActionFactory from "shared/actions/clear-data.factory";
import authService from "shared/services/auth-service";

import {
  LOGIN,
  LOGIN_TWO_FACTOR,
  RECOVERY_CODE,
  TWO_FACTOR_CODE,
  loginUser,
  storeTwoFactor
} from "../actions/login.actions";

export const CLIENT_WEB = "Web";

export const login = (loginData, from, setSubmitting) => dispatch => {
  return dispatch(loginUser({ ...loginData, client: CLIENT_WEB }))
    .then(response => {
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

export const twoFactorLogin = (code, type, setSubmitting) => (
  dispatch,
  getState
) => {
  const { email, password, from } = getState().loginData.twoFactor;
  const model = {
    email,
    password,
    client: CLIENT_WEB
  };
  if (type === TWO_FACTOR_CODE) {
    model.twoFactorCode = code;
  }
  if (type === RECOVERY_CODE) {
    model.recoveryCode = code;
  }

  const request = dispatch(loginUser(model));

  request
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch(() => setSubmitting(false));

  return request;
};

export const logout = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  dispatch(push(HOME_ROUTE));
};

export const clearLoginData = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

const clearTwoFactorData = () => dispatch => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};
