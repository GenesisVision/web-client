import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  FollowDetailsListItem,
  FollowDetailsListItemItemsViewModel
} from "gv-api-web";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { ApiAction } from "utils/types";

export const DASHBOARD_TRADING_FOLLOW_THEM = "DASHBOARD_TRADING_FOLLOW_THEM";
export const CLEAR_DASHBOARD_TRADING_FOLLOW_THEM =
  "CLEAR_DASHBOARD_TRADING_FOLLOW_THEM";

export type TTradingFollowThemItems = FollowDetailsListItem;
export type TTradingFollowThemStateData = FollowDetailsListItemItemsViewModel;
export type TTradingFollowThemState = ITableState<TTradingFollowThemStateData>;
export type TTradingFollowThemAction = ApiAction<TTradingFollowThemStateData>;

export const dashboardTradingFollowThemTableSelector = (state: RootState) =>
  state.dashboard.trading.followThem;

export const dashboardTradingFollowThemSelector = tableSelectorCreator<
  RootState,
  TTradingFollowThemStateData,
  TTradingFollowThemItems
>(dashboardTradingFollowThemTableSelector);

export const dashboardTradingFollowThemItemsSelector = createSelector(
  dashboardTradingFollowThemSelector,
  (state: TTradingFollowThemState) =>
    state.itemsData.data ? state.itemsData.data.items : undefined
);

export const dashboardTradingFollowThemReducer = tableReducerFactory<
  TTradingFollowThemStateData
>({
  type: DASHBOARD_TRADING_FOLLOW_THEM,
  paging: DEFAULT_CARD_PAGING,
  filtering: DASHBOARD_PUBLIC_FILTERING,
  defaultFilters: DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_DASHBOARD_TRADING_FOLLOW_THEM
});
