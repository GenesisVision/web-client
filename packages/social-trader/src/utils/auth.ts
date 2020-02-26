import { NextPageContext } from "next";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";

let isDelayed = false,
  timeoutId: any;

const DELAY = 60; //60sec

const calcDelay = (token: any) => {
  const dateNowSec = Math.floor(Date.now() / 1000);
  let delay = token.exp - dateNowSec - DELAY;
  if (delay < 0) {
    delay = token.exp - dateNowSec;
  }

  return delay;
};

const refreshToken = (ctx?: NextPageContext, token?: any) => {
  const isAuth = authService.isAuthenticated(ctx, token);
  const innerToken = token || authService.getTokenData(ctx);
  if (isAuth && !isDelayed) {
    const delay = calcDelay(innerToken);

    timeoutId = setTimeout(() => {
      if (isAuth) {
        authApi.updateAuthToken(authService.getAuthArg(ctx)).then(token => {
          isDelayed = false;
          authService.storeToken(token);
        });
      }
      clearTimeout(timeoutId);
    }, delay * 1000);

    isDelayed = true;
  }
};

export default refreshToken;
