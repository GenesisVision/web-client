import authActions from "actions/auth-actions";
import { HOME_ROUTE } from "pages/app/app.routes";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/login/login.routes";
import { push } from "react-router-redux";
import authService from "services/auth-service";
import clearDataActionFactory from "shared/actions/clear-data.factory";

import { LOGIN, LOGIN_TWO_FACTOR } from "../actions/login-actions";
import loginActions from "../actions/login-actions";
import { RECOVERY_CODE, TWO_FACTOR_CODE } from "../login.constants";

const login = (loginData, from, onCatch) => dispatch => {
  return dispatch(loginActions.loginUser(loginData))
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
          loginActions.storeTwoFactor({
            email: loginData.email,
            password: loginData.password,
            from
          })
        );
        dispatch(push(LOGIN_ROUTE_TWO_FACTOR_ROUTE));
      } else {
        onCatch(e);
      }
    });
};

const twoFactorLogin = (code, type, onCatch) => (dispatch, getState) => {
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

  return dispatch(loginActions.loginUser(model))
    .then(response => {
      authService.storeToken(response.value.data);
      dispatch(authActions.updateToken());
      dispatch(clearTwoFactorData());
      dispatch(push(from));
    })
    .catch(onCatch);
};

export const loginServicelogout = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  dispatch(push(HOME_ROUTE));
};

const clearLoginData = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

const clearTwoFactorData = () => dispatch => {
  const clearTwoFactorAction = clearDataActionFactory(LOGIN_TWO_FACTOR);
  dispatch(clearTwoFactorAction.clearData());
};

const loginService = {
  login,
  logout: loginServicelogout,
  twoFactorLogin,
  clearLoginData
};
export default loginService;
