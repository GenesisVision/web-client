import { SUCCESS_SUFFIX } from "reducers/reducer-creators/api-reducer";

const gtmMiddleware = (
  successSuffix = SUCCESS_SUFFIX
) => () => next => action => {
  const isSuccess = new RegExp(successSuffix + "$", "g").test(action.type);

  if (action.meta && action.meta.gtm && isSuccess) {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push(action.meta.gtm);
  }

  return next(action);
};

export default gtmMiddleware;
