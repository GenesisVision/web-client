import { SUCCESS_SUFFIX } from "shared/reducers/api-reducer/api-reducer";

const gtmMiddleware = (successSuffix = SUCCESS_SUFFIX) => ({
  dispatch
}) => next => action => {
  const SUCESS = successSuffix;
  const isSuccess = new RegExp(SUCESS + "$", "g").test(action.type);

  if (action.meta && action.meta.gtm && isSuccess) {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    window.dataLayer.push(action.meta.gtm);
  }

  return next(action);
};

export default gtmMiddleware;
