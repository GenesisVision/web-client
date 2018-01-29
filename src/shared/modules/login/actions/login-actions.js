import { LoginViewModel } from "gv-api-web";

import authService from "../../../../services/authService";
import history from "../../../../utils/history";
import routes from "../../../../utils/constants/routes";
import swaggerManagerApi from "../../../../services/api-client/swagger-manager-api";

import * as actionTypes from "./login-actions.constants";

const loginUser = (loginFormData, from) => {
  return {
    type: actionTypes.LOGIN,
    payload: swaggerManagerApi
      .apiManagerAuthSignInPostWithHttpInfo({
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
  history.push(routes.index);
  dispatch({
    type: actionTypes.LOGOUT_SUCCESS
  });
};

const loginActions = {
  loginUser,
  logoutUser
};

export default loginActions;
