import cookie from "js-cookie";
//@ts-ignore TODO fix types
import * as jwt_decode from "jwt-decode";

import { getTokenName } from "../utils/get-token-name";
import { Nullable } from "../utils/types";

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
  const tokenName = getTokenName();
  try {
    cookie.set(tokenName, token, { secure: true, expires: 1000 });
  } catch (e) {}
};

const getToken = (): Nullable<string> => {
  const tokenName = getTokenName();
  try {
    return cookie.get(tokenName) || null;
  } catch (e) {
    return null;
  }
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

const removeToken = (): void => {
  const tokenName = getTokenName();
  cookie.remove(tokenName);
};

const authService = {
  isAuthenticated,
  getAuthArg,
  getToken,
  getTokenData,
  storeToken,
  removeToken
};

export default authService;
