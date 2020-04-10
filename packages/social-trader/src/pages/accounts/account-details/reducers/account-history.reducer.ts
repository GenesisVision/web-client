import {
  ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  ASSET_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  InvestmentEventViewModels,
  SignalTradingEventItemsViewModel,
  TradesViewModel
} from "gv-api-web";
import clearableReducer from "reducers/clearable.reducer";
import { RootState } from "reducers/root-reducer";
import { combineReducers } from "redux";

import {
  ACCOUNT_OPEN_POSITIONS,
  ACCOUNT_TRADES,
  ACCOUNT_TRADES_DEFAULT_FILTERS,
  ACCOUNT_TRADES_FILTERS,
  ACCOUNT_TRADING_LOG
} from "../account-details.constants";

export const accountEventsReducer = tableReducerFactory<
  InvestmentEventViewModels
>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_PAGING,
  filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
});

export const tradingLogSelector = (state: RootState) =>
  state.accountDetails.accountHistory.tradingLog;

export const tradingLogTableSelector = tableSelectorCreator<
  RootState,
  SignalTradingEventItemsViewModel,
  SignalTradingEventItemsViewModel
>(tradingLogSelector);

export const tradingLogReducer = tableReducerFactory<
  SignalTradingEventItemsViewModel
>({
  type: ACCOUNT_TRADING_LOG,
  paging: DEFAULT_PAGING
});

export const openPositionsSelector = (state: RootState) =>
  state.accountDetails.accountHistory.openPositions;

export const openPositionsTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(openPositionsSelector);

export const openPositionsReducer = tableReducerFactory<TradesViewModel>({
  type: ACCOUNT_OPEN_POSITIONS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

export const tradesSelector = (state: RootState) =>
  state.accountDetails.accountHistory.trades;

export const tradesTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(tradesSelector);

export const tradesReducer = tableReducerFactory<TradesViewModel>({
  type: ACCOUNT_TRADES,
  paging: DEFAULT_PAGING,
  filtering: ACCOUNT_TRADES_FILTERS,
  defaultFilters: ACCOUNT_TRADES_DEFAULT_FILTERS
});

export type AccountHistoryState = Readonly<{
  tradingLog: ITableState<SignalTradingEventItemsViewModel>;
  events: ITableState<InvestmentEventViewModels>;
  openPositions: ITableState<TradesViewModel>;
  trades: ITableState<TradesViewModel>;
}>;

const accountHistoryReducer = clearableReducer(
  combineReducers<AccountHistoryState>({
    tradingLog: tradingLogReducer,
    events: accountEventsReducer,
    openPositions: openPositionsReducer,
    trades: tradesReducer
  })
);

export default accountHistoryReducer;
