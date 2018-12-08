import { FUND, INVESTOR, MANAGER, PROGRAM } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import { fetchProfileHeaderInfo } from "../../header/actions/header-actions";
import {
  cancelInvestorProgramRequest,
  cancelManagerFundRequest,
  cancelManagerProgramRequest
} from "../actions/asset-status-actions";

export const getAssetRequests = (id, role, asset) => {
  const authorization = authService.getAuthArg();
  let api, method;
  switch (role) {
    case MANAGER:
      api = managerApi;
      method =
        asset === PROGRAM
          ? api.v10ManagerProgramsByIdRequestsBySkipByTakeGet
          : asset === FUND
          ? api.v10ManagerFundsByIdRequestsBySkipByTakeGet
          : null;
      break;
    case INVESTOR:
      api = investorApi;
      method =
        asset === PROGRAM
          ? api.v10InvestorProgramsByIdRequestsBySkipByTakeGet
          : asset === FUND
          ? api.v10InvestorFundsByIdRequestsBySkipByTakeGet
          : null;
      break;
    default:
      method = null;
  }
  return method(id, 0, 10, authorization).then(requests => requests.requests);
};

export const cancelRequest = (id, role, asset) => {
  const authorization = authService.getAuthArg();
  let api, method;
  switch (role) {
    case MANAGER:
      api = managerApi;
      method =
        asset === PROGRAM
          ? api.v10ManagerProgramsRequestsByIdCancelPost
          : asset === FUND
          ? api.v10ManagerFundsRequestsByIdCancelPost
          : null;
      break;
    case INVESTOR:
      method = investorApi.v10InvestorProgramsRequestsByIdCancelPost;
      break;
    default:
      method = null;
  }
  return method(id, authorization);
};

export const cancelRequestDispatch = ({
  id,
  role,
  asset,
  onFinally
}) => dispatch => {
  const authorization = authService.getAuthArg();
  let action;
  switch (role) {
    case MANAGER:
      action =
        asset === PROGRAM
          ? cancelManagerProgramRequest
          : asset === FUND
          ? cancelManagerFundRequest
          : null;
      break;
    case INVESTOR:
      action = cancelInvestorProgramRequest;
      break;
    default:
      action = null;
  }
  return dispatch(action(id, authorization))
    .then(() => {
      dispatch(fetchProfileHeaderInfo());
      dispatch(
        alertMessageActions.success(
          `${
            process.env.REACT_APP_PLATFORM
          }.dashboard-page.requests.success-cancel-request`,
          true
        )
      );
      onFinally();
    })
    .catch(error => {
      dispatch(
        alertMessageActions.error(
          `${
            process.env.REACT_APP_PLATFORM
          }.dashboard-page.requests.failure-cancel-request`,
          true
        )
      );
      onFinally();
    });
};
