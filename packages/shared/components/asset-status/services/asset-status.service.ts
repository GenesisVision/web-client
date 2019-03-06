import { ProgramRequest, ProgramRequests } from "gv-api-web";
import { ASSET, ROLE } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import { fetchProfileHeaderInfo } from "shared/components/header/actions/header-actions";
import {
  ICancelRequest,
  cancelInvestorProgramRequest,
  cancelManagerFundRequest,
  cancelManagerProgramRequest
} from "../actions/asset-status-actions";

export const getAssetRequests = (
  id: string,
  role: ROLE,
  asset: ASSET
): Promise<Array<ProgramRequest>> => {
  const authorization = authService.getAuthArg();
  let method;
  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      method = managerApi.v10ManagerProgramsByIdRequestsBySkipByTakeGet;
      break;
    case ROLE.MANAGER + ASSET.FUND:
      method = managerApi.v10ManagerFundsByIdRequestsBySkipByTakeGet;
      break;
    case ROLE.INVESTOR + ASSET.PROGRAM:
      method = investorApi.v10InvestorProgramsByIdRequestsBySkipByTakeGet;
      break;
    case ROLE.INVESTOR + ASSET.FUND:
      method = investorApi.v10InvestorFundsByIdRequestsBySkipByTakeGet;
      break;
    default:
      method = null;
  }
  return method(id, 0, 10, authorization).then(
    (response: ProgramRequests) => response.requests
  );
};

export const cancelRequest = (
  id: string,
  role: ROLE,
  asset: ASSET
): Promise<void> => {
  const authorization = authService.getAuthArg();
  let method;

  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      method = managerApi.v10ManagerProgramsRequestsByIdCancelPost;
      break;
    case ROLE.MANAGER + ASSET.FUND:
      method = managerApi.v10ManagerFundsRequestsByIdCancelPost;
      break;
    case ROLE.INVESTOR + ASSET.PROGRAM:
      method = investorApi.v10InvestorProgramsRequestsByIdCancelPost;
      break;
    default:
      method = null;
  }
  return method(id, authorization);
};

export type CancelRequestType = {
  id: string;
  role: ROLE;
  asset: ASSET;
  onFinally: Function;
  removeDisableBtn: Function;
};

export const cancelRequestDispatch = ({
  id,
  role,
  asset,
  onFinally
}: CancelRequestType) => dispatch => {
  const authorization = authService.getAuthArg();
  let actionCreator: ICancelRequest;

  switch (role + asset) {
    case ROLE.MANAGER + ASSET.PROGRAM:
      actionCreator = cancelManagerProgramRequest;
      break;
    case ROLE.MANAGER + ASSET.FUND:
      actionCreator = cancelManagerFundRequest;
      break;
    case ROLE.INVESTOR + ASSET.PROGRAM:
      actionCreator = cancelInvestorProgramRequest;
      break;
    default:
      throw `Error role or type [${role}|${asset}]`;
  }

  return dispatch(actionCreator(id, authorization))
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
    .catch(() => {
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
