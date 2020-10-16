import { useAlerts } from "hooks/alert.hook";
import { useMemo } from "react";
import { ResponseError } from "utils/types";

import useApiRequestConstructor, {
  IAlert,
  IAlertService,
  TUseApiRequestOutput,
  TUseApiRequestProps
} from "./api-request.hook.constructor";

export enum API_REQUEST_STATUS {
  WAIT = "WAIT",
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL"
}

const getErrorMessageCallback = ({ errorMessage }: ResponseError) =>
  errorMessage;

const useApiRequest = <T extends any>(
  props: TUseApiRequestProps<T>
): TUseApiRequestOutput<T> => {
  const { successAlert, errorAlert, warningAlert } = useAlerts();
  const alertService: IAlertService = useMemo(
    () => ({
      successAlert: ({ content }: IAlert) => successAlert(content),
      errorAlert: ({ content }: IAlert) => errorAlert(content),
      warningAlert: ({ content }: IAlert) => warningAlert(content)
    }),
    []
  );
  return useApiRequestConstructor({
    ...props,
    alertService,
    getErrorMessageCallback
  });
};

export default useApiRequest;
