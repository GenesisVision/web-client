import { push } from "connected-react-router";
import { Broker, CancelablePromise } from "gv-api-web";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import brokersApi from "shared/services/api-client/brokers-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

const GM_BROKER_NAME = "Genesis Markets";

export const fetchBrokers = (): CancelablePromise<Broker[]> =>
  brokersApi.v10BrokersGet().then(data => {
    const gvBroker = data.brokers.find(x => x.name === GM_BROKER_NAME)!;
    data.brokers.splice(data.brokers.indexOf(gvBroker), 1);

    return [gvBroker, ...data.brokers];
  });

export const fetchMinDepositsAmount = (): CancelablePromise<number> =>
  managerApi
    .v10ManagerProgramsInvestmentAmountGet(authService.getAuthArg())
    .then(investmentAmount => investmentAmount.minimumDepositsAmount);

export const createProgram = (
  createProgramData: any,
  setSubmitting: (isSubmitting: boolean) => void
) => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  let data = createProgramData;
  let promise = Promise.resolve("");
  if (data.logo.cropped) {
    promise = filesService.uploadFile(data.logo.cropped, authorization);
  }
  promise
    .then(response => {
      data = {
        ...data,
        logo: response
      };

      return managerApi.v10ManagerProgramsCreatePost(authorization, {
        request: data
      });
    })
    .then(() => {
      setSubmitting(false);
      dispatch(
        alertMessageActions.success(
          "manager.create-program-page.notifications.create-success",
          true
        )
      );
      dispatch(push(DASHBOARD_ROUTE));
    })
    .catch(error => {
      setSubmitting(false);
      dispatch(alertMessageActions.error(error.errorMessage));
    });
};

export const showValidationError = () => (dispatch: Dispatch) => {
  dispatch(
    alertMessageActions.error(
      "manager.create-program-page.notifications.validate-error",
      true
    )
  );
};
