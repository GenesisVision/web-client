import investorApi from "shared/services/api-client/investor-api";
import managerApi from "shared/services/api-client/manager-api";
export const CANCEL_MANAGER_FUND_REQUESTS = "CANCEL_MANAGER_FUND_REQUESTS";
export const CANCEL_MANAGER_PROGRAM_REQUESTS =
  "CANCEL_MANAGER_PROGRAM_REQUESTS";
export const CANCEL_INVESTOR_PROGRAM_REQUESTS =
  "CANCEL_INVESTOR_PROGRAM_REQUESTS";

export const cancelInvestorProgramRequest = (id, auth) => {
  return {
    type: CANCEL_INVESTOR_PROGRAM_REQUESTS,
    payload: investorApi.v10InvestorProgramsRequestsByIdCancelPost(id, auth)
  };
};

export const cancelManagerFundRequest = (id, auth) => {
  return {
    type: CANCEL_MANAGER_FUND_REQUESTS,
    payload: managerApi.v10ManagerFundsRequestsByIdCancelPost(id, auth)
  };
};

export const cancelManagerProgramRequest = (id, auth) => {
  return {
    type: CANCEL_MANAGER_PROGRAM_REQUESTS,
    payload: managerApi.v10ManagerProgramsRequestsByIdCancelPost(id, auth)
  };
};
