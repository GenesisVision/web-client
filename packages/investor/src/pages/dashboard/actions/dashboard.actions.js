import investorApi from "shared/services/api-client/investor-api";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const fetchDashboardPrograms = (auth, filters) => {
  return {
    type: DASHBOARD_PROGRAMS,
    payload: investorApi.v10InvestorProgramsGet(auth, filters)
  };
};

export const fetchDashboardFunds = (auth, filters) => {
  return {
    type: DASHBOARD_FUNDS,
    payload: investorApi.v10InvestorFundsGet(auth, filters)
  };
};

export const fetchPortfolioChart = (auth, filters) => {
  return {
    type: DASHBOARD_PORTFOLIO_CHART,
    payload: investorApi.v10InvestorPortfolioChartGet(auth, filters)
  };
};

export const fetchPortfolioEvents = (auth, filters) => {
  return {
    type: DASHBOARD_PORTFOLIO_EVENTS,
    payload: investorApi.v10InvestorPortfolioEventsGet(auth, filters)
  };
};

export const fetchInRequests = (auth, skip, take) => {
  return {
    type: DASHBOARD_IN_REQUESTS,
    payload: investorApi.v10InvestorRequestsBySkipByTakeGet(skip, take, auth)
  };
};

export const cancelFundRequest = (auth, id) => {
  return {
    type: DASHBOARD_CANCEL_FUND_REQUESTS,
    payload: investorApi.v10InvestorFundsRequestsByIdCancelPost(id, auth)
  };
};

export const cancelProgramRequest = (auth, id) => {
  return {
    type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
    payload: investorApi.v10InvestorProgramsRequestsByIdCancelPost(id, auth)
  };
};
