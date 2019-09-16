import { CancelablePromise } from "gv-api-web";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { SetSubmittingType } from "shared/utils/types";

import useErrorMessage, { TErrorMessage } from "./error-message.hook";
import useIsOpen from "./is-open.hook";

type TNullValue = undefined;
export const nullValue = undefined;

type TRequest<T> = CancelablePromise<T>;

type TUseApiRequestProps<T> = {
  request: (...args: any) => TRequest<T>;
  setSubmitting?: SetSubmittingType;
  defaultData?: T;
  catchCallback?: (errorMessage?: string) => void;
};

type TUseApiRequestOutput<T> = {
  errorMessage: TErrorMessage;
  isPending: boolean;
  data: T | TNullValue;
  sendRequest: (...args: any) => TRequest<any>;
};

const useApiRequest = <T>({
  request,
  setSubmitting,
  defaultData,
  catchCallback
}: TUseApiRequestProps<T>): TUseApiRequestOutput<T> => {
  const dispatch = useDispatch();
  const [data, setData] = useState<T | TNullValue>(defaultData || nullValue);
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();

  const sendRequest = (...args: any) => {
    setIsPending();
    return request(...args)
      .then(setData)
      .catch(({ errorMessage }) => {
        setErrorMessage(errorMessage);
        dispatch(alertMessageActions.error(errorMessage));
        catchCallback && catchCallback(errorMessage);
      })
      .finally(() => {
        setIsNotPending();
        setSubmitting && setSubmitting(false);
      });
  };

  return { errorMessage, isPending, data, sendRequest };
};
export default useApiRequest;
