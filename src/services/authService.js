import * as jwt_decode from "jwt-decode";

import { apiUrl } from "../utils/constants/apiUrl";
import { AUTH_TOKEN } from "../utils/constants";
import httpClient from "../utils/httpClient";

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

const login = async user => {
  const data = await httpClient.post(apiUrl.login, user);
  storeToken(data);
  return data;
};

const logout = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

const register = async user => {
  try {
    const data = await httpClient.post(apiUrl.register, user);
    storeToken(data.token);
    return data;
  } catch (e) {
    throw new Error("Register Error");
  }
};

const authService = {
  isAuthenticated,
  getToken,
  storeToken,
  getUserName,
  login,
  logout,
  register
};
export default authService;
