import { CancelablePromise } from "gv-api-web";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MiddlewareType, setPromiseMiddleware } from "utils/promise-middleware";
import { ResponseError, SetSubmittingType } from "utils/types";

import useErrorMessage, { TErrorMessage } from "./error-message.hook";
import useIsOpen from "./is-open.hook";

type TNullValue = undefined;
export const nullValue = undefined;

type TRequest<T> = CancelablePromise<T>;

export type TUseApiRequestProps<T = any> = {
  request: (...args: any) => any;
  defaultData?: T;
  catchCallback?: (errorMessage?: string) => void;
  successMessage?: string;
  middleware?: MiddlewareType[];
};

type TUseApiRequestOutput<T> = {
  errorMessage: TErrorMessage;
  isPending: boolean;
  data: T | TNullValue;
  sendRequest: (
    props?: any,
    setSubmitting?: SetSubmittingType
  ) => TRequest<any>;
  cleanErrorMessage: () => void;
};

const useApiRequest = <T>({
  middleware = [],
  successMessage,
  request,
  defaultData,
  catchCallback
}: TUseApiRequestProps<T>): TUseApiRequestOutput<T> => {
  const dispatch = useDispatch();
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
    return res;
  };

  const middlewareList: MiddlewareType[] = [
    ...middleware,
    setData,
    cleanErrorMessage,
    sendSuccessMessage
  ];

  const sendRequest = (props?: any, setSubmitting?: SetSubmittingType) => {
    setIsPending();
    return setPromiseMiddleware(Promise.resolve(request(props)), middlewareList)
      .catch((errorMessage: ResponseError) => {
        setErrorMessage(errorMessage);
        dispatch(alertMessageActions.error(errorMessage.errorMessage));
        catchCallback && catchCallback(errorMessage.errorMessage);
      })
      .finally(() => {
        setIsNotPending();
        setSubmitting && setSubmitting(false);
      }) as TRequest<T>;
  };

  return { errorMessage, cleanErrorMessage, isPending, data, sendRequest };
};
export default useApiRequest;
