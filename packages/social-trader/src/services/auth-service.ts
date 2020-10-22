import jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import { cookieServiceCreator } from "utils/cookie-service.creator";
import { GV_TOKEN_KEY } from "utils/get-token-name";

const LOGGED_KEY = "LOGGED_KEY";

export const {
  get: getLogged,
  set: setLogged,
  clear: clearLogged
} = cookieServiceCreator({
  key: LOGGED_KEY
});

export type TokenDto = {
  exp: number;
};

export const {
  get: getToken,
  set: setToken,
  clear: clearToken
} = cookieServiceCreator({
  key: GV_TOKEN_KEY
});

const canParseToken = (token: string): boolean => {
  try {
    jwt_decode(token);
    return true;
  } catch (e) {
    return false;
  }
};

const decodeToken = (token: string): TokenDto | null => {
  if (!canParseToken(token)) return null;
  return jwt_decode<TokenDto>(token);
};

const storeToken = (token: string): void => {
  setLogged("true");
  setToken(token);
};

const getTokenData = (ctx?: NextPageContext) => decodeToken(getAuthArg(ctx));

const generateTokenString = (token: string): string => `Bearer ${token}`;

const getAuthArg = (ctx?: NextPageContext): string => {
  const token = getToken(ctx);
  if (!token) {
    return "";
  }

  return token;
};

const isAuthenticated = (
  ctx?: NextPageContext,
  token: any = getAuthArg(ctx)
): boolean => {
  if (!canParseToken(token)) return false;
  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode<TokenDto>(token);
  return decodedToken.exp > dateNowSec;
};

const removeToken = (): void => {
  clearToken();
};

const authService = {
  generateTokenString,
  isAuthenticated,
  getAuthArg,
  getTokenData,
  storeToken,
  removeToken
};

export default authService;
