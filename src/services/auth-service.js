import * as jwt_decode from "jwt-decode";
import { authApiProxy } from "services/api-client/auth-api";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import { AUTH_TOKEN } from "../utils/constants";

const canParseToken = token => {
  try {
    jwt_decode(token);
    return true;
  } catch (e) {
    return false;
  }
};

const decodeToken = token => {
  if (!canParseToken(token)) return false;
  return jwt_decode(token);
};

const storeToken = token => {
  localStorage.setItem(AUTH_TOKEN, token);
};

const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

const getTokenData = () => decodeToken(getToken());

const getAuthArg = () => {
  const token = getToken();
  if (token === null) {
    return null;
  }

  return `Bearer ${token}`;
};

const isAuthenticated = () => {
  const token = getToken();

  if (!canParseToken(token)) return false;
  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode(token);
  return decodedToken.exp > dateNowSec;
};

const getUserName = () => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated() ? decodeToken(token).unique_name : "";
};

const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

const logoutFromDevices = () => dispatch => {
  authApiProxy
    .v10AuthTokenDevicesLogoutPost(getAuthArg())
    .then(response => {
      dispatch(
        alertMessageActions.success(
          "auth.logout-from-another-devices.success-message",
          true
        )
      );
      return response;
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage || error.message));
      return error;
    });
};

const authService = {
  isAuthenticated,
  getAuthArg,
  getToken,
  getTokenData,
  storeToken,
  removeToken,
  getUserName,
  logoutFromDevices
};

export default authService;
