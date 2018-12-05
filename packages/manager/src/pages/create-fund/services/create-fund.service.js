import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { push } from "react-router-redux";
import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import FundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import filesService from "shared/services/file-service";

export const fetchBalance = () => dispatch =>
  dispatch(fetchProfileHeaderInfo());

export const fetchAssets = () =>
  FundsApi.v10FundsAssetsGet(authService.getAuthArg());

export const fetchInvestmentAmount = () =>
  managerApi.v10ManagerFundsInvestmentAmountGet(authService.getAuthArg());

export const createFund = (createFundData, setSubmitting) => dispatch => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve(null);
  if (createFundData.logo.cropped) {
    promise = filesService.uploadFile(
      createFundData.logo.cropped,
      authorization
    );
  }
  promise
    .then(response => {
      createFundData = {
        ...createFundData,
        logo: response || ""
      };

      return managerApi.v10ManagerFundsCreatePost(authorization, {
        request: createFundData
      });
    })
    .then(() => {
      setSubmitting(false);
      dispatch(
        alertMessageActions.success(
          "create-fund-page.notifications.create-success",
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

export const showValidationError = () => dispatch => {
  dispatch(
    alertMessageActions.error(
      "create-fund-page.notifications.validate-error",
      true
    )
  );
};
