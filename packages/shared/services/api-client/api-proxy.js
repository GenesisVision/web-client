import handleErrorResponse from "shared/utils/handle-error-response";

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
            return Promise.reject({
              isPending: false,
              ...handleErrorResponse(ex.response)
            });
          });
      };
    }
  });
};

export default withApiProxy;
