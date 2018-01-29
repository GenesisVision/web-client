import * as actionTypes from "./constants";
import { apiClientPublic } from "../../../services/api-client/swagger-custom-client";

import { ManagerApi, LoginViewModel } from "gv-api-web";
import authService from "../../../services/authService";
import history from "../../../utils/history";
import routes from "../../../utils/constants/routes";

const composePromise = user => {
  const api = new ManagerApi(apiClientPublic());
  const opts = {
    model: LoginViewModel.constructFromObject(user)
  };
  return api.apiManagerAuthSignInPostWithHttpInfo(opts);
};
const loginUser = (user, from) => ({
  type: "LOGIN",
  payload: composePromise(user)
});

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
