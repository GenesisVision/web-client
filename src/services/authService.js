import * as jwt_decode from "jwt-decode";

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

const authService = {
  isAuthenticated,
  getToken,
  storeToken,
  removeToken,
  getUserName
};

export default authService;
