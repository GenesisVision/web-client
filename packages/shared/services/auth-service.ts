import cookie from "js-cookie";
//@ts-ignore TODO fix types
import * as jwt_decode from "jwt-decode";
import { NextPageContext } from "next";
import nextCookie from "next-cookies";

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
    cookie.set(tokenName, token, {
      secure: process.env.NODE_ENV === "production",
      expires: 1000
    });
  } catch (e) {}
};

const getTokenFromServer = (ctx: NextPageContext): Nullable<string> => {
  const tokenName = getTokenName();
  return nextCookie(ctx)[tokenName] || null;
};

const getTokenFromClient = (): Nullable<string> => {
  const tokenName = getTokenName();
  return cookie.get(tokenName) || null;
};

const getTokenData = () => decodeToken(getTokenFromClient() || "");

const getAuthArg = (ctx?: NextPageContext): string => {
  const token = ctx ? getTokenFromServer(ctx) : getTokenFromClient();
  if (token === null) {
    return "";
  }

  return `Bearer ${token}`;
};

const isAuthenticated = (): boolean => {
  const token = getTokenFromClient();

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
  getTokenFromServer,
  getTokenFromClient,
  getTokenData,
  storeToken,
  removeToken
};

export default authService;
