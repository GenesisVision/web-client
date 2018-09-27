import handleErrorMessage from "utils/handle-error-message";

const withApiProxy = api => {
  return new Proxy(api, {
    get(target, property) {
      const originalMethod = target[property];
      if (typeof originalMethod !== "function") return originalMethod;
      return (...args) => {
        return originalMethod
          .apply(target, args)
          .then(result => {
            return {
              isPending: false,
              data: result
            };
          })
          .catch(ex => {
            throw {
              isPending: false,
              ...handleErrorMessage(ex.response)
            };
          });
      };
    }
  });
};

export default withApiProxy;
