import { LoginViewModel } from "gv-api-web";

import authService from "../../../../services/authService";
import history from "../../../../utils/history";
import routes from "../../../../utils/constants/routes";
import swaggerManagerApi from "../../../../services/api-client/swagger-manager-api";

import * as actionTypes from "./login-actions.constants";

const loginUser = (user, from) => {
  return {
    type: "LOGIN",
    payload: swaggerManagerApi.apiManagerAuthSignInPostWithHttpInfo({
      model: LoginViewModel.constructFromObject(user)
    })
  };
};

const logoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST
});

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

const logoutUser = () => dispatch => {
  dispatch(logoutRequest());
  authService.logout();
  history.push(routes.index);
  dispatch(logoutSuccess());
};

const loginActions = {
  loginUser,
  logoutUser
};

export default loginActions;
