import { push } from "connected-react-router";
import { Broker, CancelablePromise, NewProgramRequest } from "gv-api-web";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { Dispatch } from "redux";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import brokersApi from "shared/services/api-client/brokers-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { ManagerThunk, SetSubmittingType } from "shared/utils/types";

import { ICreateProgramSettingsFormValues } from "../components/create-program-settings/create-program-settings";

const GM_BROKER_NAME = "Genesis Markets";

export const fetchBrokers = (): CancelablePromise<Broker[]> =>
  brokersApi.v10BrokersGet().then(data => {
    const gvBroker = data.brokers.find(x => x.name === GM_BROKER_NAME)!;
    data.brokers.splice(data.brokers.indexOf(gvBroker), 1);

    return [gvBroker, ...data.brokers];
  });

export const fetchMinDepositsAmount = (): CancelablePromise<{
  [key: string]: number;
}> =>
  managerApi
    .v10ManagerProgramsInvestmentAmountGet(authService.getAuthArg())
    .then(investmentAmount => investmentAmount.minimumDepositsAmount);

export const createProgram = (
  createProgramData: Pick<
    ICreateProgramSettingsFormValues,
    keyof NewProgramRequest
  >,
  setSubmitting: SetSubmittingType
): ManagerThunk<void> => dispatch => {
  const authorization = authService.getAuthArg();

  let promise = Promise.resolve("");
  if (createProgramData.logo.cropped) {
    promise = filesService.uploadFile(
      createProgramData.logo.cropped,
      authorization
    );
  }
  promise
    .then(response => {
      const requestData = <NewProgramRequest>{
        ...createProgramData,
        logo: response
      };

      return managerApi.v10ManagerProgramsCreatePost(authorization, {
        request: requestData
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
      dispatch(fetchWallets());
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
