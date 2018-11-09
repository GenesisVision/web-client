import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import { DASHBOARD_ROUTE } from "pages/dashboard/dashboard.routes";
import { push } from "react-router-redux";
import FundsApi from "services/api-client/funds-api";
import { managerApiProxy } from "services/api-client/manager-api";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import filesService from "shared/services/file-service";

import { getDataWithoutSuffixes } from "../helpers/create-fund.helpers";

export const fetchBalance = () => dispatch =>
  dispatch(fetchProfileHeaderInfo());

export const fetchAssets = () =>
  FundsApi.v10FundsAssetsGet(authService.getAuthArg());

export const fetchInvestmentAmount = () =>
  managerApiProxy.v10ManagerFundsInvestmentAmountGet(authService.getAuthArg());

export const createFund = (createFundData, setSubmitting) => dispatch => {
  const authorization = authService.getAuthArg();

  let data = getDataWithoutSuffixes(createFundData, [
    "periodLength",
    "exitFee",
    "entryFee",
    "leverage"
  ]);
  let promise = Promise.resolve(null);
  if (data.logo.cropped) {
    promise = filesService.uploadFileProxy(data.logo.cropped, authorization);
  }
  promise
    .then(response => {
      data = {
        ...data,
        logo: response || ""
      };

      return managerApiProxy.v10ManagerFundsCreatePost(authorization, {
        request: data
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
