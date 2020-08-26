import {
  ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  ASSET_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "components/table/helpers/table.selector";
import {
  DEFAULT_EVENTS_PAGING,
  DEFAULT_PAGING
} from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { RootState } from "reducers/root-reducer";
import { combineReducers } from "redux";

import {
  GET_PROGRAM_PERIOD_HISTORY,
  PROGRAM_FINANCIAL_STATISTIC,
  PROGRAM_FINANCIAL_STATISTIC_DEFAULT_FILTERS,
  PROGRAM_FINANCIAL_STATISTIC_FILTERS,
  PROGRAM_OPEN_POSITIONS,
  PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS,
  PROGRAM_SUBSCRIBERS_FILTERS,
  PROGRAM_SUBSCRIPTIONS,
  PROGRAM_TRADES,
  PROGRAM_TRADES_DEFAULT_FILTERS,
  PROGRAM_TRADES_FILTERS
} from "../program-details.constants";
import {
  EventsDataType,
  OpenTradesDataType,
  ProgramPeriodsDataType,
  SignalProviderSubscribersDataType,
  TradesDataType
} from "../program-details.types";

export const programEventsSelector = (state: RootState) =>
  state.programDetails.programHistory.events;

export const programEventsTableSelector = tableSelectorCreator<
  RootState,
  EventsDataType,
  EventsDataType
>(programEventsSelector, "events");

export const programEventsReducer = tableReducerFactory<EventsDataType>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_EVENTS_PAGING,
  filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
});

export const openPositionsSelector = (state: RootState) =>
  state.programDetails.programHistory.openPositions;

export const openPositionsTableSelector = tableSelectorCreator<
  RootState,
  OpenTradesDataType,
  OpenTradesDataType
>(openPositionsSelector);

export const openPositionsReducer = tableReducerFactory<OpenTradesDataType>({
  type: PROGRAM_OPEN_POSITIONS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

export const tradesSelector = (state: RootState) =>
  state.programDetails.programHistory.trades;

export const tradesTableSelector = tableSelectorCreator<
  RootState,
  TradesDataType,
  TradesDataType
>(tradesSelector);

export const tradesReducer = tableReducerFactory<TradesDataType>({
  type: PROGRAM_TRADES,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_TRADES_FILTERS,
  defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
});

const periodHistorySelector = (state: RootState) =>
  state.programDetails.programHistory.periodHistory;

export const periodHistoryTableSelector = tableSelectorCreator<
  RootState,
  ProgramPeriodsDataType,
  ProgramPeriodsDataType
>(periodHistorySelector, "periods");

export const periodHistoryReducer = tableReducerFactory<ProgramPeriodsDataType>(
  {
    type: GET_PROGRAM_PERIOD_HISTORY,
    paging: DEFAULT_PAGING,
    filtering: PROGRAM_TRADES_FILTERS,
    defaultFilters: PROGRAM_TRADES_DEFAULT_FILTERS
  }
);

const financialStatisticSelector = (state: RootState) =>
  state.programDetails.programHistory.financialStatistic;

export const financialStatisticTableSelector = tableSelectorCreator<
  RootState,
  ProgramPeriodsDataType,
  ProgramPeriodsDataType
>(financialStatisticSelector, "periods");

export const financialStatisticReducer = tableReducerFactory<
  ProgramPeriodsDataType
>({
  type: PROGRAM_FINANCIAL_STATISTIC,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_FINANCIAL_STATISTIC_FILTERS,
  defaultFilters: PROGRAM_FINANCIAL_STATISTIC_DEFAULT_FILTERS
});

const subscriptionsSelector = (state: RootState) =>
  state.programDetails.programHistory.subscriptions;

export const subscriptionsTableSelector = tableSelectorCreator<
  RootState,
  SignalProviderSubscribersDataType,
  SignalProviderSubscribersDataType
>(subscriptionsSelector, "subscribers");

export const subscriptionsReducer = tableReducerFactory<
  SignalProviderSubscribersDataType
>({
  type: PROGRAM_SUBSCRIPTIONS,
  paging: DEFAULT_PAGING,
  filtering: PROGRAM_SUBSCRIBERS_FILTERS,
  defaultFilters: PROGRAM_SUBSCRIBERS_DEFAULT_FILTERS
});

export type ProgramHistoryState = Readonly<{
  events: ITableState<EventsDataType>;
  openPositions: ITableState<OpenTradesDataType>;
  trades: ITableState<TradesDataType>;
  periodHistory: ITableState<ProgramPeriodsDataType>;
  financialStatistic: ITableState<ProgramPeriodsDataType>;
  subscriptions: ITableState<SignalProviderSubscribersDataType>;
}>;

const programHistoryReducer = clearableReducer(
  combineReducers<ProgramHistoryState>({
    events: programEventsReducer,
    openPositions: openPositionsReducer,
    trades: tradesReducer,
    periodHistory: periodHistoryReducer,
    financialStatistic: financialStatisticReducer,
    subscriptions: subscriptionsReducer
  })
);

export default programHistoryReducer;
