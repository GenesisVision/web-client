import { Dispatch } from "redux";
import investorApi from "shared/services/api-client/investor-api";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioChart = () => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(actions.fetchPortfolioChart(authorization));
};

export interface IDashboardAssetsCounts {
  programsCount?: number;
  fundsCount?: number;
  tradesCount?: number;
}

export const fetchAssetsCount = (): Promise<IDashboardAssetsCounts> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    investorApi.v10InvestorProgramsGet(authorization, filtering),
    investorApi.v10InvestorFundsGet(authorization, filtering),
    investorApi.v10InvestorSignalsGet(authorization, filtering)
  ]).then(([programsData, fundsData, copytradingData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total,
    tradesCount: copytradingData.total
  }));
};

export interface IDashboardTradesCounts {
  openTradesCount?: number;
  historyCount?: number;
}
export const fetchTradesCount = (): Promise<IDashboardTradesCounts> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    signalApi.v10SignalTradesOpenGet(authorization, filtering),
    /*investorApi.v10InvestorFundsGet(authorization, filtering)*/ Promise.resolve(
      { total: 1 }
    )
  ]).then(([openTradesData, historyData]) => ({
    openTradesCount: openTradesData.total,
    historyCount: historyData.total
  }));
};
