import useApiRequestConstructor from "@pavelzubov/use-api-request";
import {
  API_REQUEST_STATUS as API_REQUEST_STATUS_TYPE,
  IAlert,
  IAlertService,
  TUseApiRequestOutput,
  TUseApiRequestProps
} from "@pavelzubov/use-api-request/dist/hooks/useApiRequest";
import { useAlerts } from "hooks/alert.hook";
import { useMemo } from "react";
import Token from "services/api-client/token";
import { ResponseError } from "utils/types";

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
  return useApiRequestConstructor.useApiRequest({
    ...props,
    cacheMaxAge: 100 * 60 * 60 * 24,
    token: Token.create().value,
    alertService,
    getErrorMessageCallback
  });
};

export default useApiRequest;
