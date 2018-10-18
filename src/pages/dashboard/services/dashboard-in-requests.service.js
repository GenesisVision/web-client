import { fetchProfileHeaderInfo } from "modules/header/actions/header-actions";
import authService from "services/auth-service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";

import {
  cancelFundRequest,
  cancelProgramRequest,
  fetchInRequests
} from "../actions/dashboard.actions";
import { getPortfolioEvents } from "./dashboard.service";

export const getInRequests = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  dispatch(fetchInRequests(authorization, 0, 100));
};

export const cancelRequest = (requestId, type, onFinally) => (
  dispatch,
  getState
) => {
  const authorization = authService.getAuthArg();
  const action =
    type === "Program"
      ? cancelProgramRequest(authorization, requestId)
      : cancelFundRequest(authorization, requestId);

  return dispatch(action)
    .then(() => {
      dispatch(getInRequests());
      dispatch(fetchProfileHeaderInfo());
      dispatch(getPortfolioEvents());
      dispatch(
        alertMessageActions.success(
          "dashboard-page.requests.success-cancel-request",
          true
        )
      );
      onFinally();
    })
    .catch(ex => {
      dispatch(
        alertMessageActions.error(
          "dashboard-page.requests.failure-cancel-request",
          true
        )
      );
      onFinally();
    });
};
