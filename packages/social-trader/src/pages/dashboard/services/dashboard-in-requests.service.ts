import { CancelRequestType } from "components/dashboard/dashboard.constants";
import { fetchProfileHeaderInfoAction } from "components/header/actions/header-actions";
import { ASSETS_TYPES } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ROLE_ENV } from "constants/constants";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
import authService from "services/auth-service";

import {
  cancelProgramRequestAction,
  fetchInRequestsAction
} from "../actions/dashboard.actions";
import { getPortfolioEvents } from "./dashboard.service";

export const getInRequests = (
  assetType?: ASSETS_TYPES,
  ctx?: NextPageContext
) => async (dispatch: Dispatch): Promise<any> =>
  await dispatch(
    fetchInRequestsAction(authService.getAuthArg(ctx), 0, 100, assetType)
  );

export const cancelRequest: CancelRequestType = ({
  id,
  onFinally,
  removeDisableBtn
}) => dispatch => {
  const authorization = authService.getAuthArg();
  const action = cancelProgramRequestAction(authorization, id);

  return ((dispatch(action) as unknown) as Promise<any>)
    .then(() => {
      dispatch(getInRequests());
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(getPortfolioEvents);
      dispatch(
        alertMessageActions.success(
          `${ROLE_ENV}.dashboard-page.requests.success-cancel-request`,
          true
        )
      );
      onFinally();
    })
    .catch(error => {
      dispatch(alertMessageActions.error(error.errorMessage));
      removeDisableBtn();
    });
};