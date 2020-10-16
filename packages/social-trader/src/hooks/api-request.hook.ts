import { useAlerts } from "hooks/alert.hook";
import { useMemo } from "react";
import { ResponseError } from "utils/types";

import useApiRequestConstructor, {
  API_REQUEST_STATUS as API_REQUEST_STATUS_TYPE,
  IAlert,
  IAlertService,
  TUseApiRequestOutput,
  TUseApiRequestProps
} from "./api-request.hook.constructor";

export type API_REQUEST_STATUS = API_REQUEST_STATUS_TYPE;

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
