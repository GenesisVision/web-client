import jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { getTokenName } from "utils/get-token-name";

export type TokenDto = {
  exp: number;
};

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
