import handleErrorResponse from "utils/handle-error-response";

const withApiProxy = (api: any) => {
  return new Proxy(api, {
    get(target, property) {
      const originalMethod = target[property];
      if (typeof originalMethod !== "function") return originalMethod;
      return (...args: any[]) => {
        // TODO fix types
        return originalMethod.apply(target, args).catch((ex: any) => {
          return Promise.reject({
            ...handleErrorResponse(ex.response)
          });
        });
      };
    }
  });
};

export default withApiProxy;
