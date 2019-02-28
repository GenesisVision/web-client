import { Dispatch } from "redux";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
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
    signalApi.v10SignalTradesGet(authorization, filtering)
  ]).then(([openTradesData, historyData]) => ({
    openTradesCount: openTradesData.total,
    historyCount: historyData.total
  }));
};

export const closeTrade = (id: string, onSuccess: () => void) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .v10SignalTradesByIdClosePost(id, authorization)
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "investor.dashboard-page.trades.close-trade-confirm.success-message",
          true
        )
      );
    })
    .catch(() => {
      dispatch(
        alertMessageActions.error(
          "investor.dashboard-page.trades.close-trade-confirm.error-message",
          true
        )
      );
    });
};
