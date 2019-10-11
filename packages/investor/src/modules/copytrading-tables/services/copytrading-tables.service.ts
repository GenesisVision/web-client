import { InvestorRootState } from "reducers";
import { Dispatch } from "redux";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import { alertMessageActions } from "shared/modules/alert-message/actions/alert-message-actions";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

import * as actions from "../actions/copytrading-tables.actions";
import {
  dashboardTradesHistoryTableSelector,
  dashboardTradesLogTableSelector
} from "../components/copytrading-tables.selectors";

export const getCopytradingTradesLog = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingTradesLogAction(authorization, filters);
};

export const getCopytradingOpenTrades = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingOpenTradesAction(authorization, filters);
};

export const getCopytradingTradesHistory = (accountCurrency?: string) => (
  filters: any
) => {
  const authorization = authService.getAuthArg();
  if (accountCurrency) {
    filters = { ...filters, accountCurrency };
  }
  return actions.fetchCopytradingTradesHistoryAction(authorization, filters);
};

export interface ICopytradingTradesCounts {
  logCount?: number;
  openTradesCount?: number;
  historyCount?: number;
}

export const getCopytradingTradesCount = (accountCurrency?: string) => (
  dispatch: Dispatch,
  getState: () => InvestorRootState
) => {
  const commonFiltering = { take: 0 };

  const copytradingTradesHistoryFilters = composeRequestFiltersByTableState(
    dashboardTradesHistoryTableSelector(getState())
  );
  dispatch(
    getCopytradingTradesHistory(accountCurrency)({
      ...copytradingTradesHistoryFilters,
      ...commonFiltering
    })
  );

  const copytradingTradesLogFilters = composeRequestFiltersByTableState(
    dashboardTradesLogTableSelector(getState())
  );
  dispatch(
    getCopytradingTradesLog(accountCurrency)({
      ...copytradingTradesLogFilters,
      ...commonFiltering
    })
  );
};

export type CloseCopytradingTrade = (
  tradeId: string,
  onSuccess: () => void,
  programId?: string
) => void;

export const closeCopytradingTrade: CloseCopytradingTrade = (
  tradeId,
  onSuccess,
  programId
) => (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();
  return signalApi
    .closeTrade(tradeId, authorization, { programId })
    .then(() => {
      onSuccess();
      dispatch(
        alertMessageActions.success(
          "investor.copytrading-tables.close-trade-confirm.success-message",
          true
        )
      );
    })
    .catch(() => {
      dispatch(
        alertMessageActions.error(
          "investor.copytrading-tables.close-trade-confirm.error-message",
          true
        )
      );
    });
};
