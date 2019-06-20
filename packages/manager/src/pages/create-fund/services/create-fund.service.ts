import { push } from "connected-react-router";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { Dispatch } from "redux";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";
import { RootThunk, SetSubmittingType } from "shared/utils/types";

export const fetchBalance = () => (dispatch: Dispatch) =>
  dispatch(fetchProfileHeaderInfoAction());

export const fetchInvestmentAmount = () =>
  managerApi.v10ManagerFundsInvestmentAmountGet(authService.getAuthArg());

export const createFund = (
  createFundData,
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
      createFundData = {
        ...createFundData,
        logo: response
      };

      return managerApi.v10ManagerFundsCreatePost(authorization, {
        request: createFundData
      });
    })
    .then(() => {
      setSubmitting(false);
      dispatch(
        alertMessageActions.success(
          "manager.create-fund-page.notifications.create-success",
          true
        )
      );
      dispatch(fetchWallets());
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
      "manager.create-fund-page.notifications.validate-error",
      true
    )
  );
};
