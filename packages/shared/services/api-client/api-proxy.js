import handleErrorResponse from "shared/utils/handle-error-response";

const withApiProxy = api => {
  return new Proxy(api, {
    get(target, property) {
      const originalMethod = target[property];
      if (typeof originalMethod !== "function") return originalMethod;
      return (...args) => {
        return originalMethod.apply(target, args).catch(ex => {
          return Promise.reject({
            ...handleErrorResponse(ex.response)
          });
        });
      };
    }
  });
};

export default withApiProxy;
