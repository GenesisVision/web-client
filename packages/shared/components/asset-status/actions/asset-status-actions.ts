import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import { ActionType } from "shared/utils/types";

export const CANCEL_MANAGER_PROGRAM_REQUESTS =
  "CANCEL_MANAGER_PROGRAM_REQUESTS";
export const CANCEL_INVESTOR_PROGRAM_REQUESTS =
  "CANCEL_INVESTOR_PROGRAM_REQUESTS";
const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";

export interface ICancelRequest {
  (id: string, auth: string): ActionType;
}

export interface IFetchInRequests {
  (auth: string, skip: number, take: number): ActionType;
}

export const cancelInvestorProgramRequest: ICancelRequest = (id, auth) => {
  return {
    type: CANCEL_INVESTOR_PROGRAM_REQUESTS,
    payload: investorApi.v10InvestorProgramsRequestsByIdCancelPost(id, auth)
  };
};

export const cancelManagerProgramRequest: ICancelRequest = (id, auth) => {
  return {
    type: CANCEL_MANAGER_PROGRAM_REQUESTS,
    payload: managerApi.v10ManagerProgramsRequestsByIdCancelPost(id, auth)
  };
};

export const fetchInRequestsInvestor: IFetchInRequests = (auth, skip, take) => {
  return {
    type: DASHBOARD_IN_REQUESTS,
    payload: investorApi.v10InvestorRequestsBySkipByTakeGet(skip, take, auth)
  };
};

export const fetchInRequestsManager: IFetchInRequests = (auth, skip, take) => {
  return {
    type: DASHBOARD_IN_REQUESTS,
    payload: managerApi.v10ManagerRequestsBySkipByTakeGet(skip, take, auth)
  };
};
