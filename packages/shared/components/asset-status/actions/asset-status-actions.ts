import { ProgramRequests } from "gv-api-web";
import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
import { ApiAction } from "shared/utils/types";

export const CANCEL_MANAGER_PROGRAM_REQUESTS =
  "CANCEL_MANAGER_PROGRAM_REQUESTS";
export const CANCEL_INVESTOR_PROGRAM_REQUESTS =
  "CANCEL_INVESTOR_PROGRAM_REQUESTS";
const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";

export interface ICancelRequest<T = any> {
  (id: string, auth: string): ApiAction<T>;
}

export interface IFetchInRequests<T = any> {
  (auth: string, skip: number, take: number): ApiAction<T>;
}

export const cancelInvestorProgramRequestAction: ICancelRequest = (
  id,
  auth
) => ({
  type: CANCEL_INVESTOR_PROGRAM_REQUESTS,
  payload: investorApi.cancelRequest(id, auth)
});

export const cancelManagerProgramRequestAction: ICancelRequest = (
  id,
  auth
) => ({
  type: CANCEL_MANAGER_PROGRAM_REQUESTS,
  payload: managerApi.cancelRequest(id, auth)
});

export const fetchInRequestsInvestorAction: IFetchInRequests<
  ProgramRequests
> = (auth, skip, take) => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: investorApi.getRequests(skip, take, auth)
});

export const fetchInRequestsManagerAction: IFetchInRequests<ProgramRequests> = (
  auth,
  skip,
  take
) => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: managerApi.getRequests(skip, take, auth)
});
