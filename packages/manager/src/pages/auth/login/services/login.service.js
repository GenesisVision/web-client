import { push } from "connected-react-router";
import authActions from "shared/actions/auth-actions";
import authService from "shared/services/auth-service";

import { loginUser } from "../actions/login.actions";
import {
  clearTwoFactorData,
  sharedLogin
} from "shared/components/auth/login/login.service";
import {
  LOGIN,
  RECOVERY_CODE,
  TWO_FACTOR_CODE
} from "shared/components/auth/login/login.actions";
import { Dispatch } from "redux";
import clearDataActionFactory from "shared/actions/clear-data.factory";

export const CLIENT_WEB = "Web";

export const login = (loginData, from, setSubmitting) => dispatch => {
  return sharedLogin(loginData, from, setSubmitting, dispatch, loginUser);
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

export const clearLoginData = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};
