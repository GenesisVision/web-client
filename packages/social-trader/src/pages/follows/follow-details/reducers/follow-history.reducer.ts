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
  SignalProviderSubscribers,
  TradesViewModel
} from "gv-api-web";
import clearableReducer from "reducers/clearable.reducer";
import { RootState } from "reducers/root-reducer";
import { combineReducers } from "redux";

import {
  FOLLOW_OPEN_POSITIONS,
  FOLLOW_SUBSCRIBERS_DEFAULT_FILTERS,
  FOLLOW_SUBSCRIBERS_FILTERS,
  FOLLOW_SUBSCRIPTIONS,
  FOLLOW_TRADES,
  FOLLOW_TRADES_DEFAULT_FILTERS,
  FOLLOW_TRADES_FILTERS
} from "../follow-details.constants";

export const followEventsSelector = (state: RootState) =>
  state.followDetails.followHistory.events;

export const followEventsTableSelector = tableSelectorCreator<
  RootState,
  InvestmentEventViewModels,
  InvestmentEventViewModels
>(followEventsSelector, "events");

export const followEventsReducer = tableReducerFactory<
  InvestmentEventViewModels
>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_PAGING,
  filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
});

export const openPositionsSelector = (state: RootState) =>
  state.followDetails.followHistory.openPositions;

export const openPositionsTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(openPositionsSelector);

export const openPositionsReducer = tableReducerFactory<TradesViewModel>({
  type: FOLLOW_OPEN_POSITIONS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

export const tradesSelector = (state: RootState) =>
  state.followDetails.followHistory.trades;

export const tradesTableSelector = tableSelectorCreator<
  RootState,
  TradesViewModel,
  TradesViewModel
>(tradesSelector);

export const tradesReducer = tableReducerFactory<TradesViewModel>({
  type: FOLLOW_TRADES,
  paging: DEFAULT_PAGING,
  filtering: FOLLOW_TRADES_FILTERS,
  defaultFilters: FOLLOW_TRADES_DEFAULT_FILTERS
});

const subscriptionsSelector = (state: RootState) =>
  state.followDetails.followHistory.subscriptions;

export const subscriptionsTableSelector = tableSelectorCreator<
  RootState,
  SignalProviderSubscribers,
  SignalProviderSubscribers
>(subscriptionsSelector, "subscribers");

export const subscriptionsReducer = tableReducerFactory<
  SignalProviderSubscribers
>({
  type: FOLLOW_SUBSCRIPTIONS,
  paging: DEFAULT_PAGING,
  filtering: FOLLOW_SUBSCRIBERS_FILTERS,
  defaultFilters: FOLLOW_SUBSCRIBERS_DEFAULT_FILTERS
});

export type FollowHistoryState = Readonly<{
  events: ITableState<InvestmentEventViewModels>;
  openPositions: ITableState<TradesViewModel>;
  trades: ITableState<TradesViewModel>;
  subscriptions: ITableState<SignalProviderSubscribers>;
}>;

const followHistoryReducer = clearableReducer(
  combineReducers<FollowHistoryState>({
    events: followEventsReducer,
    openPositions: openPositionsReducer,
    trades: tradesReducer,
    subscriptions: subscriptionsReducer
  })
);

export default followHistoryReducer;
