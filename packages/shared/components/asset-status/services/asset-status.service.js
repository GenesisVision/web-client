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
  let method;
  switch (role + asset) {
    case MANAGER + PROGRAM:
      method = managerApi.v10ManagerProgramsByIdRequestsBySkipByTakeGet;
      break;
    case MANAGER + FUND:
      method = managerApi.v10ManagerFundsByIdRequestsBySkipByTakeGet;
      break;
    case INVESTOR + PROGRAM:
      method = investorApi.v10InvestorProgramsByIdRequestsBySkipByTakeGet;
      break;
    case INVESTOR + FUND:
      method = investorApi.v10InvestorFundsByIdRequestsBySkipByTakeGet;
      break;
    default:
      method = null;
  }
  return method(id, 0, 10, authorization).then(requests => requests.requests);
};

export const cancelRequest = (id, role, asset) => {
  const authorization = authService.getAuthArg();
  let method;

  switch (role + asset) {
    case MANAGER + PROGRAM:
      method = managerApi.v10ManagerProgramsRequestsByIdCancelPost;
      break;
    case MANAGER + FUND:
      method = managerApi.v10ManagerFundsRequestsByIdCancelPost;
      break;
    case INVESTOR + PROGRAM:
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

  switch (role + asset) {
    case MANAGER + PROGRAM:
      action = cancelManagerProgramRequest;
      break;
    case MANAGER + FUND:
      action = cancelManagerFundRequest;
      break;
    case INVESTOR + PROGRAM:
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
