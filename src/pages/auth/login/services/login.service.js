import { setTwoFactorRequirement } from "actions/2fa-actions";
import authActions from "actions/auth-actions";
import { HOME_ROUTE } from "pages/app/app.routes";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/login/login.routes";
import { push } from "react-router-redux";
import authService from "services/auth-service";
import clearDataActionFactory from "shared/actions/clear-data.factory";

import {
  LOGIN,
  LOGIN_TWO_FACTOR,
  RECOVERY_CODE,
  TWO_FACTOR_CODE,
  loginUser,
  storeTwoFactor
} from "../actions/login.actions";

export const login = (loginData, from, setSubmitting) => dispatch => {
  return dispatch(loginUser(loginData))
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(push(from));
    })
    .catch(e => {
      if (
        e.response &&
        e.response.body &&
        e.response.body.code === "RequiresTwoFactor"
      ) {
        dispatch(
          storeTwoFactor({
            email: loginData.email,
            password: loginData.password,
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
    password
  };
  if (type === TWO_FACTOR_CODE) {
    model.twoFactorCode = code;
  }
  if (type === RECOVERY_CODE) {
    model.recoveryCode = code;
  }

  return dispatch(loginUser(model))
    .then(response => {
      authService.storeToken(response.value);
      dispatch(authActions.updateToken());
      dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch(() => setSubmitting(false));
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
