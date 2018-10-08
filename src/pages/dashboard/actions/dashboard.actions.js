import investorApi from "services/api-client/investor-api";

export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_PORTFOLIO_CHART = "DASHBOARD_PORTFOLIO_CHART";
export const DASHBOARD_CHART = "DASHBOARD_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";

export const fetchPortfolioChart = (data, filters) => {
  return {
    type: DASHBOARD_PORTFOLIO_CHART,
    payload: investorApi.v10InvestorPortfolioChartGet(data, filters)
  };
};

export const fetchFunds = data => {
  return {
    type: DASHBOARD_FUNDS,
    payload: 1 /* SwaggerInvestorApi.apiInvestorDashboardGet(
      data
    ) */
  };
};

export const fetchPortfolioEvents = data => {
  return {
    type: DASHBOARD_PORTFOLIO_EVENTS,
    payload: investorApi.v10InvestorPortfolioEventsGet(data)
  };
};
