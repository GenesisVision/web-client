import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MiddlewareType, setPromiseMiddleware } from "utils/promise-middleware";
import { ResponseError } from "utils/types";

import useErrorMessage, { TErrorMessage } from "./error-message.hook";
import useIsOpen from "./is-open.hook";

export enum API_REQUEST_STATUS {
  WAIT = "WAIT",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL"
}

type TNullValue = undefined;
export const nullValue = undefined;

type TRequest<T> = Promise<T>;

export type TUseApiRequestProps<T = any> = {
  fetchOnMountData?: any;
  request: (...args: any) => TRequest<T>;
  defaultData?: T;
  catchCallback?: (error: ResponseError) => void;
  successMessage?: string;
  middleware?: MiddlewareType[];
  fetchOnMount?: boolean;
};

type TUseApiRequestOutput<T> = {
  setData: (data: T | TNullValue) => void;
  status: API_REQUEST_STATUS;
  errorMessage: TErrorMessage;
  isPending: boolean;
  data: T | TNullValue;
  sendRequest: (props?: any) => TRequest<any>;
  cleanErrorMessage: () => void;
};

const useApiRequest = <T extends any>({
  fetchOnMountData,
  fetchOnMount,
  middleware = [],
  successMessage,
  request,
  defaultData,
  catchCallback
}: TUseApiRequestProps<T>): TUseApiRequestOutput<T> => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<API_REQUEST_STATUS>(
    API_REQUEST_STATUS.WAIT
  );
  const [data, setData] = useState<T | TNullValue>(defaultData || nullValue);
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();

  const sendSuccessMessage = (res: any) => {
    successMessage &&
      dispatch(alertMessageActions.success(successMessage, true));
    setStatus(API_REQUEST_STATUS.SUCCESS);
    return res;
  };

  const middlewareList: MiddlewareType[] = [
    ...middleware,
    setData,
    cleanErrorMessage,
    sendSuccessMessage
  ];

  const sendRequest = (props?: any) => {
    setIsPending();
    setStatus(API_REQUEST_STATUS.PENDING);
    return ((setPromiseMiddleware(
      request(props),
      middlewareList
    ) as unknown) as Promise<any>)
      .catch((errorMessage: ResponseError) => {
        setStatus(API_REQUEST_STATUS.FAIL);
        setErrorMessage(errorMessage);
        dispatch(alertMessageActions.error(errorMessage.errorMessage));
        catchCallback && catchCallback(errorMessage);
      })
      .finally(() => {
        setIsNotPending();
      }) as TRequest<T>;
  };

  useEffect(() => {
    if (fetchOnMount) sendRequest(fetchOnMountData);
  }, []);

  return {
    setData,
    status,
    errorMessage,
    cleanErrorMessage,
    isPending,
    data,
    sendRequest
  };
};
export default useApiRequest;
