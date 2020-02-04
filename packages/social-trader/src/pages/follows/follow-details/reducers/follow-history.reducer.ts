import {
  ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  ASSET_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "components/portfolio-events-table/portfolio-events-table.constants";
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

export const followEventsReducer = tableReducerFactory<
  InvestmentEventViewModels
>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_PAGING,
  filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
});

export const openPositionsReducer = tableReducerFactory<TradesViewModel>({
  type: FOLLOW_OPEN_POSITIONS,
  paging: { ...DEFAULT_PAGING, itemsOnPage: Number.MAX_VALUE }
});

export const tradesReducer = tableReducerFactory<TradesViewModel>({
  type: FOLLOW_TRADES,
  paging: DEFAULT_PAGING,
  filtering: FOLLOW_TRADES_FILTERS,
  defaultFilters: FOLLOW_TRADES_DEFAULT_FILTERS
});

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
