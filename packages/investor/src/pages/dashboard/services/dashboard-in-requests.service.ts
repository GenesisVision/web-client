import {
  CancelRequestType,
  GetInRequestsType
} from "shared/components/dashboard/dashboard.constants";
import { fetchProfileHeaderInfoAction } from "shared/components/header/actions/header-actions";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import authService from "shared/services/auth-service";

import {
  cancelProgramRequestAction,
  fetchInRequestsAction
} from "../actions/dashboard.actions";
import { getTopPortfolioEvents } from "./dashboard-events.services";

export const getInRequests: GetInRequestsType = () => dispatch => {
  const authorization = authService.getAuthArg();
  dispatch(fetchInRequestsAction(authorization, 0, 100));
};

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
      dispatch(getTopPortfolioEvents);
      dispatch(
        alertMessageActions.success(
          `${ROLE_ENV ||
            ROLE.MANAGER}.dashboard-page.requests.success-cancel-request`, // TODO remove after union
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
