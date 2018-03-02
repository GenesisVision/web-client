import { LoginViewModel } from "gv-api-web";

import authService from "../../../services/authService";
import history from "../../../utils/history";
import swaggerInvestorApi from "../../../services/api-client/swagger-investor-api";

import { HOME_ROUTE } from "../../../components/app.constants";
import * as actionTypes from "./login-actions.constants";

const loginUser = (loginFormData, from) => {
  return {
    type: actionTypes.LOGIN,
    payload: swaggerInvestorApi
      .apiInvestorAuthSignInPostWithHttpInfo({
        model: LoginViewModel.constructFromObject(loginFormData)
      })
      .then(response => {
        authService.storeToken(response.data);
        history.push(from);
      })
  };
};

const logoutUser = () => dispatch => {
  authService.removeToken();
  history.push(HOME_ROUTE);
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS
  });
};

const loginActions = {
  loginUser,
  logoutUser
};

export default loginActions;
