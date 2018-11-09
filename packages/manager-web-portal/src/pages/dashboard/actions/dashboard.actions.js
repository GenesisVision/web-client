import managerApi, { managerApiProxy } from "services/api-client/manager-api";

export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_PROGRAMS_FILTERS = "DASHBOARD_PROGRAMS_FILTERS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_FUNDS_FILTERS = "DASHBOARD_FUNDS_FILTERS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";

export const DASHBOARD_ASSET_CHART = "DASHBOARD_ASSET_CHART";

export const fetchPortfolioEvents = (auth, filters) => {
  return {
    type: DASHBOARD_PORTFOLIO_EVENTS,
    payload: managerApiProxy.v10ManagerEventsGet(auth, filters)
  };
};

export const fetchInRequests = (auth, skip, take) => {
  return {
    type: DASHBOARD_IN_REQUESTS,
    payload: managerApi.v10ManagerRequestsBySkipByTakeGet(skip, take, auth)
  };
};

export const fetchDashboardPrograms = (auth, filters) => {
  return {
    type: DASHBOARD_PROGRAMS,
    payload: managerApi.v10ManagerProgramsGet(auth, filters)
  };
};

export const updateDashboardProgramsFilters = filters => ({
  type: DASHBOARD_PROGRAMS_FILTERS,
  payload: filters
});

export const fetchDashboardFunds = (auth, filters) => {
  return {
    type: DASHBOARD_FUNDS,
    payload: managerApi.v10ManagerFundsGet(auth, filters)
  };
};

export const updateDashboardFundsFilters = filters => ({
  type: DASHBOARD_FUNDS_FILTERS,
  payload: filters
});

export const cancelFundRequest = (auth, id) => {
  return {
    type: DASHBOARD_CANCEL_FUND_REQUESTS,
    payload: managerApiProxy.v10ManagerFundsRequestsByIdCancelPost(id, auth)
  };
};

export const cancelProgramRequest = (auth, id) => {
  return {
    type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
    payload: managerApiProxy.v10ManagerProgramsRequestsByIdCancelPost(id, auth)
  };
};

export const dashboardChart = assetChart => {
  return {
    type: DASHBOARD_ASSET_CHART,
    payload: assetChart
  };
};
