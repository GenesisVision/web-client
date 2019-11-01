import { CancelablePromise } from "gv-api-web";
import { Dispatch } from "redux";
import { CancelRequestType } from "shared/components/dashboard/dashboard.constants";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import {
  cancelProgramRequestAction,
  fetchInRequestsAction
} from "../actions/dashboard.actions";
import { getPortfolioEvents } from "./dashboard.service";

export const getInRequests = (assetType?: ASSETS_TYPES) => (
  dispatch: Dispatch
): ActionType<CancelablePromise<any>> =>
  dispatch(fetchInRequestsAction(authService.getAuthArg(), 0, 100, assetType));

export const cancelRequest: CancelRequestType = ({
  id,
  onFinally,
  removeDisableBtn
}) => dispatch => {
  const authorization = authService.getAuthArg();
  const action = cancelProgramRequestAction(authorization, id);

  return dispatch(action)
    .then(() => {
      dispatch(getInRequests());
      dispatch(fetchProfileHeaderInfoAction());
      dispatch(getPortfolioEvents);
      dispatch(
        alertMessageActions.success(
          `${ROLE_ENV ||
            ROLE.MANAGER}.dashboard-page.requests.success-cancel-request`, // TODO remove after union
          true
        )
      );
      onFinally();
    })
    .catch((error: { errorMessage: string }) => {
      dispatch(alertMessageActions.error(error.errorMessage));
      removeDisableBtn();
    });
};
