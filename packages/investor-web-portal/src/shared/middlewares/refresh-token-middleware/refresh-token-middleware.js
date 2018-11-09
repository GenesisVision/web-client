let isDelayed = false,
  timeoutId = 0;

const DELAY = 60; //60sec

const calcDelay = token => {
  const dateNowSec = Math.floor(Date.now() / 1000);
  let delay = token.exp - dateNowSec - DELAY;
  if (delay < 0) {
    delay = token.exp - dateNowSec;
  }

  return delay;
};

const refreshTokenMiddleware = (
  authService,
  refreshToken
) => () => next => action => {
  const isAuthenticated = authService.isAuthenticated();
  if (isAuthenticated && !isDelayed) {
    const token = authService.getTokenData();
    const delay = calcDelay(token);

    timeoutId = setTimeout(() => {
      if (isAuthenticated) {
        refreshToken(authService.getAuthArg()).then(token => {
          isDelayed = false;
          authService.storeToken(token);
        });
      }
      clearTimeout(timeoutId);
    }, delay * 1000);

    isDelayed = true;
  }
  return next(action);
};

export default refreshTokenMiddleware;
