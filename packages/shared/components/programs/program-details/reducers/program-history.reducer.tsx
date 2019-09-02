import {
  InvestmentEventViewModels,
  ProgramPeriodsViewModel,
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import { combineReducers } from "redux";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";
import { RootState } from "shared/reducers/root-reducer";

import {
  PROGRAM_EVENTS,
  PROGRAM_FINANCIAL_STATISTIC,
  PROGRAM_OPEN_POSITIONS,
  PROGRAM_PERIOD_HISTORY,
  PROGRAM_SUBSCRIPTIONS,
  PROGRAM_TRADES
} from "../actions/program-details.actions";
import {
  PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS,
  PROGRAM_SUBSCRIBERS_FILTERS,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";
import { PortfolioEvent } from "../program-details.types";

const eventsSelector = (state: RootState) =>
  state.programDetails.programHistory.events;

export const eventsTableSelector = tableSelectorCreator<
  RootState,
  InvestmentEventViewModels,
  InvestmentEventViewModels
>(eventsSelector, "events");

export const eventsReducer = tableReducerFactory<InvestmentEventViewModels>({
  type: PROGRAM_EVENTS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

const openPositionsSelector = (state: RootState) =>
  state.programDetails.programHistory.openPositions;

export const openPositionsTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(openPositionsSelector, "trades");

export const openPositionsReducer = tableReducerFactory<TradesViewModel>({
  type: PROGRAM_OPEN_POSITIONS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

const tradesSelector = (state: RootState) =>
  state.programDetails.programHistory.trades;

export const tradesTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(tradesSelector, "trades");

export const tradesReducer = tableReducerFactory<TradesViewModel>({
  type: PROGRAM_TRADES,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_TRADES_FILTERS,
  defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
});

const periodHistorySelector = (state: RootState) =>
  state.programDetails.programHistory.periodHistory;

export const periodHistoryTableSelector = tableSelectorCreator<
  RootState,
  ProgramPeriodsViewModel,
  ProgramPeriodsViewModel
>(periodHistorySelector, "periods");

export const periodHistoryReducer = tableReducerFactory<
  ProgramPeriodsViewModel
>({
  type: PROGRAM_PERIOD_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_TRADES_FILTERS,
  defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
});

const financialStatisticSelector = (state: RootState) =>
  state.programDetails.programHistory.financialStatistic;

export const financialStatisticTableSelector = tableSelectorCreator<
  RootState,
  ProgramPeriodsViewModel,
  ProgramPeriodsViewModel
>(financialStatisticSelector, "periods");

export const financialStatisticReducer = tableReducerFactory<
  ProgramPeriodsViewModel
>({
  type: PROGRAM_FINANCIAL_STATISTIC,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_TRADES_FILTERS,
  defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
});

const subscriptionsSelector = (state: RootState) =>
  state.programDetails.programHistory.subscriptions;

export const subscriptionsTableSelector = tableSelectorCreator<
  RootState,
  SignalProviderSubscribers,
  SignalProviderSubscribers
>(subscriptionsSelector, "subscribers");

export const subscriptionsReducer = tableReducerFactory<
  SignalProviderSubscribers
>({
  type: PROGRAM_SUBSCRIPTIONS,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_SUBSCRIBERS_FILTERS,
  defaultFilters: PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS
});

export type ProgramHistoryState = Readonly<{
  events: ITableState<InvestmentEventViewModels>;
  openPositions: ITableState<TradesViewModel>;
  trades: ITableState<TradesViewModel>;
  periodHistory: ITableState<ProgramPeriodsViewModel>;
  financialStatistic: ITableState<ProgramPeriodsViewModel>;
  subscriptions: ITableState<SignalProviderSubscribers>;
}>;

const programHistoryReducer = clearableReducer(
  combineReducers<ProgramHistoryState>({
    events: eventsReducer,
    openPositions: openPositionsReducer,
    trades: tradesReducer,
    periodHistory: periodHistoryReducer,
    financialStatistic: financialStatisticReducer,
    subscriptions: subscriptionsReducer
  })
);

export default programHistoryReducer;
