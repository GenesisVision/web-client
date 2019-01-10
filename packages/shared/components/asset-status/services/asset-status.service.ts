import { type } from "os";

import { ProgramRequest, ProgramRequests } from "gv-api-web";
import { Dispatch } from "react-redux";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FUND, INVESTOR, MANAGER, PROGRAM } from "shared/constants/constants";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";

import { ActionType, DispatchType } from "../../../utils/types";
import { fetchProfileHeaderInfo } from "../../header/actions/header-actions";
import {
  ICancelRequest,
  cancelInvestorProgramRequest,
  cancelManagerFundRequest,
  cancelManagerProgramRequest
} from "../actions/asset-status-actions";

export const getAssetRequests = (
  id: string,
  role: string,
  asset: string
): Promise<Array<ProgramRequest>> => {
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
  return method(id, 0, 10, authorization).then(
    (response: ProgramRequests) => response.requests
  );
};

export const cancelRequest = (
  id: string,
  role: string,
  asset: string
): Promise<void> => {
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

export type CancelReqestType = {
  id: string;
  role: string;
  asset: string;
  onFinally: Function;
};

export const cancelRequestDispatch = ({
  id,
  role,
  asset,
  onFinally
}: CancelReqestType) => dispatch => {
  const authorization = authService.getAuthArg();
  let actionCreator: ICancelRequest;

  switch (role + asset) {
    case MANAGER + PROGRAM:
      actionCreator = cancelManagerProgramRequest;
      break;
    case MANAGER + FUND:
      actionCreator = cancelManagerFundRequest;
      break;
    case INVESTOR + PROGRAM:
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
