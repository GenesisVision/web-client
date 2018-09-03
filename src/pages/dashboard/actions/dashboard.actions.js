import investorApi from "services/api-client/investor-api";

export const DASHBOARD_PROGRAMS = "DASHBOARD_PROGRAMS";
export const DASHBOARD_FUNDS = "DASHBOARD_FUNDS";
export const DASHBOARD_CHART_COMMON = "DASHBOARD_CHART_COMMON";
export const DASHBOARD_CHART = "DASHBOARD_CHART";
export const DASHBOARD_PORTFOLIO_EVENTS = "DASHBOARD_PORTFOLIO_EVENTS";

export const fetchChartCommon = data => {
  return {
    type: DASHBOARD_CHART_COMMON,
    payload: 1 /* SwaggerInvestorApi.apiInvestorDashboardGet(
     data
    ) */
  };
};

export const fetchPrograms = (authorization, data) => {
  return {
    type: DASHBOARD_PROGRAMS,
    payload: investorApi.v10InvestorProgramsGet(authorization, data)
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
