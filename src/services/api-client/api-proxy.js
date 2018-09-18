import { hideLoading, showLoading } from "react-redux-loading-bar";
import store from "store";
import handleErrorMessage from "utils/handle-error-message";

const apiProxy = (api, dispatch) => {
  return new Proxy(api, {
    get(target, property) {
      const origianlMethod = target[property];
      if (typeof origianlMethod !== "function") return origianlMethod;
      return (...args) => {
        dispatch(showLoading());
        return origianlMethod
          .apply(target, args)
          .then(result => {
            return {
              isPending: false,
              data: result
            };
          })
          .catch(ex => {
            return {
              isPending: false,
              errorMessage: handleErrorMessage(ex.response)
            };
          })
          .finally(() => {
            dispatch(hideLoading());
          });
      };
    }
  });
};

const withApiProxy = api => apiProxy(api, store.dispatch);

export default withApiProxy;
