import { CancelablePromise } from "gv-api-web";

export type MiddlewareType<T = any> = (res: T) => void;

export const setPromiseMiddleware = async (
  promise: CancelablePromise<any>,
  middleware: MiddlewareType[]
) => {
  const result = await promise;
  for (const middlewareItem of middleware) await middlewareItem(result);
  return result;
};
