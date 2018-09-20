import handleErrorMessage from "utils/handle-error-message";

const withApiProxy = api => {
  return new Proxy(api, {
    get(target, property) {
      const origianlMethod = target[property];
      if (typeof origianlMethod !== "function") return origianlMethod;
      return (...args) => {
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
          });
      };
    }
  });
};

export default withApiProxy;
