import * as actionTypes from './constants';
import { apiClientPublic } from "../../../services/api-client/swagger-custom-client";

import {
  ManagerApi,
  LoginViewModel
} from "gv-api-web";
import authService from '../../../services/authService';
import history from "../../../utils/history";
import routes from "../../../utils/constants/routes";



export const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
});

export const loginSuccess = email => ({
  type: actionTypes.LOGIN_SUCCESS,
  email
});

export const loginError = message => ({
  type: actionTypes.LOGIN_FAILURE,
  message
});

const loginUser = (user, from) => async dispatch => {
  const { email } = user;
  dispatch(loginRequest());

  const api = new ManagerApi(apiClientPublic());
  const opts = {
    model: LoginViewModel.constructFromObject(user)
  };

  try {
    const response = await api.apiManagerAuthSignInPostWithHttpInfo(opts);
    authService.storeToken(response.data);
    dispatch(loginSuccess(email));
    history.push(from.pathname);
  } catch (e) {
    const error = JSON.parse(e.response.text);
    dispatch(loginError(error.errors[0].message));
    e.responseError = error;
    throw e;
  }
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
