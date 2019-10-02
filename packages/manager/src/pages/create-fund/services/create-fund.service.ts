import { push } from "connected-react-router";
import { NewFundRequest } from "gv-api-web";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import { DASHBOARD_ROUTE } from "shared/routes/dashboard.routes";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { RootThunk, SetSubmittingType } from "shared/utils/types";

import { ICreateFundSettingsFormValues } from "../components/create-fund-settings/create-fund-settings";

export const fetchMinimumDepositAmount = () =>
  managerApi.v10ManagerFundsInvestmentAmountGet(authService.getAuthArg());

export const createFund = (
  createFundData: ICreateFundSettingsFormValues,
  setSubmitting: SetSubmittingType
): RootThunk<void> => dispatch => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("");
  if (createFundData.logo.image) {
    promise = filesService.uploadFile(
      createFundData.logo.image.cropped,
      authorization
    );
  }
  promise
    .then(response => {
      const requestData = <NewFundRequest>{
        ...createFundData,
        logo: response
      };

      return managerApi.v10ManagerFundsCreatePost(authorization, {
        request: requestData
      });
    })
    .then(() => {
      dispatch(
        alertMessageActions.success(
          "manager.create-fund-page.notifications.create-success",
          true
        )
      );
      dispatch(push(DASHBOARD_ROUTE));
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
    })
    .finally(() => {
      setSubmitting(false);
    });
};
