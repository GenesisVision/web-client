import authActions from "../../../actions/auth-actions";
import authService from "../../../services/auth-service";
import history from "../../../utils/history";
import loginActions from "../actions/login-actions";

import { HOME_ROUTE } from "../../../components/app.constants";

const login = (loginData, from) => dispatch => {
  return dispatch(loginActions.loginUser(loginData)).then(response => {
    authService.storeToken(response.value.data);
    dispatch(authActions.updateToken());
    history.push(from);
  });
};

const logout = () => dispatch => {
  authService.removeToken();
  dispatch(authActions.updateToken());
  history.push(HOME_ROUTE);
};

const loginService = { login, logout };
export default loginService;
