import authActions from "../../../actions/auth-actions";
import authService from "../../../services/auth-service";
import history from "../../../utils/history";
import loginActions from "../actions/login-actions";

import { HOME_ROUTE } from "../../../components/app.constants";
import { LOGIN } from "../actions/login-actions.constants";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "../login.constants";
import clearDataActionFactory from "../../../shared/actions/clear-data.factory";

const login = (loginData, from, onCatch) => dispatch => {
  return dispatch(loginActions.loginUser(loginData))
    .then(response => {
      authService.storeToken(response.value.data);
      dispatch(authActions.updateToken());
      history.push(from);
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
        history.push(LOGIN_ROUTE_TWO_FACTOR_ROUTE);
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
  if (type === "twoFactorCode") {
    model.twoFactorCode = code;
  }
  if (type === "recoveryCode") {
    model.recoveryCode = code;
  }

  return dispatch(loginActions.loginUser(model))
    .then(response => {
      authService.storeToken(response.value.data);
      dispatch(authActions.updateToken());
      history.push(from);
    })
    .catch(onCatch);
};

const logout = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  history.push(HOME_ROUTE);
};

const clearLoginData = () => dispatch => {
  const clearLoginDataAction = clearDataActionFactory(LOGIN);
  dispatch(clearLoginDataAction.clearData());
};

const loginService = { login, logout, twoFactorLogin, clearLoginData };
export default loginService;
