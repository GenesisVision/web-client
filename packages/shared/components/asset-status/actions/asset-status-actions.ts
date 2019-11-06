import { CancelablePromise } from "gv-api-web";
// import investorApi from "shared/services/api-client/investor-api";
// import managerApi from "shared/services/api-client/manager-api";
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
  payload: Promise.resolve() as CancelablePromise<any> //investorApi.cancelRequest(id, auth)
});

export const cancelManagerProgramRequestAction: ICancelRequest = (
  id,
  auth
) => ({
  type: CANCEL_MANAGER_PROGRAM_REQUESTS,
  payload: Promise.resolve() as CancelablePromise<any> //managerApi.cancelRequest(id, auth)
});

export const fetchInRequestsInvestorAction: IFetchInRequests<
  any //ProgramRequests
> = (auth, skip, take) => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: Promise.resolve() as CancelablePromise<any> //investorApi.getRequests(skip, take, auth)
});

export const fetchInRequestsManagerAction: IFetchInRequests<
  any //ProgramRequests
> = (auth, skip, take) => ({
  type: DASHBOARD_IN_REQUESTS,
  payload: Promise.resolve() as CancelablePromise<any> //managerApi.getRequests(skip, take, auth)
});
