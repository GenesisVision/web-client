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

const getErrorMessageCallback = (error: ResponseError) => error?.errorMessage;

interface Props<T> extends TUseApiRequestProps<T> {
  errorAlertHandler?: (error: string) => string;
  isUseLocalizationOnError?: boolean;
}

const useApiRequest = <T extends any>(
  props: Props<T>
): TUseApiRequestOutput<T> => {
  const { errorAlertHandler = (error: string) => error } = props;
  const { successAlert, errorAlert, warningAlert } = useAlerts();
  const alertService: IAlertService = useMemo(
    () => ({
      successAlert: ({ content }: IAlert) => successAlert(content),
      errorAlert: ({ content }: IAlert) =>
        errorAlert(errorAlertHandler(content), props.isUseLocalizationOnError),
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
