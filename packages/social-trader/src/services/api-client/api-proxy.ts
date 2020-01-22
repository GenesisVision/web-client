import handleErrorResponse from "utils/handle-error-response";

const withApiProxy = (api: any) => {
  return new Proxy(api, {
    get(target, property) {
      const originalMethod = target[property];
      if (typeof originalMethod !== "function") return originalMethod;
      return (...args: any[]) => {
        return originalMethod.apply(target, args).catch((error: any) => {
          return Promise.reject({
            ...handleErrorResponse(error)
          });
        });
      };
    }
  });
};

export default withApiProxy;
