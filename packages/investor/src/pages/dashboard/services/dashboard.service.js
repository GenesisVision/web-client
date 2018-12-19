import investorApi from "shared/services/api-client/investor-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioChart(authorization));
};

export const fetchAssetsCount = () => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    investorApi.v10InvestorProgramsGet(authorization, filtering),
    investorApi.v10InvestorFundsGet(authorization, filtering)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};
