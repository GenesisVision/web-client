import investorApi from "shared/services/api-client/investor-api";
import signalApi from "shared/services/api-client/signal-api";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";
export const DASHBOARD_IN_REQUESTS = "DASHBOARD_IN_REQUESTS";
export const DASHBOARD_CANCEL_FUND_REQUESTS = "DASHBOARD_CANCEL_FUND_REQUESTS";
export const DASHBOARD_CANCEL_PROGRAM_REQUESTS =
  "DASHBOARD_CANCEL_PROGRAM_REQUESTS";
export const DASHBOARD_OPEN_TRADES = "DASHBOARD_OPEN_TRADES";
export const DASHBOARD_TRADES_HISTORY = "DASHBOARD_TRADES_HISTORY";

export const CLEAR_DASHBOARD_ASSETS_TABLE = "CLEAR_DASHBOARD_ASSETS_TABLE";
export const CLEAR_DASHBOARD_TRADES_TABLE = "CLEAR_DASHBOARD_TRADES_TABLE";

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

export const cancelProgramRequest = (auth, id) => {
  return {
    type: DASHBOARD_CANCEL_PROGRAM_REQUESTS,
    payload: investorApi.v10InvestorProgramsRequestsByIdCancelPost(id, auth)
  };
};

export const clearDashboardAssetsTable = () => ({
  type: CLEAR_DASHBOARD_ASSETS_TABLE
});

export const fetchDashboardOpenTrades = (auth, filters) => {
  return {
    type: DASHBOARD_OPEN_TRADES,
    payload: signalApi.v10SignalTradesOpenGet(auth, filters)
  };
};

export const fetchDashboardTradesHistory = (auth, filters) => {
  return {
    type: DASHBOARD_OPEN_TRADES,
    payload: signalApi.v10SignalTradesOpenGet(auth, filters) //Use api for trades history
  };
};
