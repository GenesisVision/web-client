//@ts-ignore TODO fix types
import * as jwt_decode from "jwt-decode";

import { getTokenName } from "../utils/get-token-name";
import { Nullable } from "../utils/types";

const AUTH_TOKEN = getTokenName();

const canParseToken = (token: string): boolean => {
  try {
    jwt_decode(token);
    return true;
  } catch (e) {
    return false;
  }
};

const decodeToken = (token: string): any => {
  if (!canParseToken(token)) return false;
  return jwt_decode(token);
};

const storeToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

const getToken = (): Nullable<string> => {
  return localStorage.getItem(AUTH_TOKEN);
};

const getTokenData = () => decodeToken(getToken() || "");

const getAuthArg = (): string => {
  const token = getToken();
  if (token === null) {
    return "";
  }

  return `Bearer ${token}`;
};

const isAuthenticated = (): boolean => {
  const token = getToken();

  if (!canParseToken(token || "")) return false;
  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode(token);
  return decodedToken.exp > dateNowSec;
};

const getUserName = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return isAuthenticated() ? decodeToken(token || "").unique_name : "";
};

const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};

const authService = {
  isAuthenticated,
  getAuthArg,
  getToken,
  getTokenData,
  storeToken,
  removeToken,
  getUserName
};

export default authService;
