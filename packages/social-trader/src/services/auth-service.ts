//@ts-ignore TODO fix types
import * as jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { getTokenName } from "utils/get-token-name";

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
  setCookie(tokenName, token);
};

const getTokenData = (ctx?: NextPageContext) => decodeToken(getAuthArg(ctx));

const generateTokenString = (token: string): string => `Bearer ${token}`;

const getAuthArg = (ctx?: NextPageContext): string => {
  const tokenName = getTokenName();
  const token = getCookie(tokenName, ctx);
  if (!token) {
    return "";
  }

  return generateTokenString(token);
};

const isAuthenticated = (
  ctx?: NextPageContext,
  token: any = getAuthArg(ctx)
): boolean => {
  if (!canParseToken(token)) return false;
  const dateNowSec = Math.floor(Date.now() / 1000);
  const decodedToken = jwt_decode(token);
  return decodedToken.exp > dateNowSec;
};

const removeToken = (): void => {
  const tokenName = getTokenName();
  removeCookie(tokenName);
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
