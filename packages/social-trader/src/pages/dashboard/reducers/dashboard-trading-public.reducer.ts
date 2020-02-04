import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  DashboardTradingAsset,
  ItemsViewModelDashboardTradingAsset
} from "gv-api-web";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { RootState } from "reducers/root-reducer";
import { ApiAction } from "utils/types";

export const DASHBOARD_TRADING_PUBLIC = "DASHBOARD_TRADING_PUBLIC";

export type TTradingPublicItems = DashboardTradingAsset;
export type TTradingPublicStateData = ItemsViewModelDashboardTradingAsset;
export type TTradingPublicState = ITableState<TTradingPublicStateData>;
export type TTradingPublicAction = ApiAction<TTradingPublicStateData>;

export const dashboardTradingPublicTableSelector = (state: RootState) =>
  state.dashboard.trading.public;

export const dashboardTradingPublicSelector = tableSelectorCreator<
  RootState,
  TTradingPublicStateData,
  TTradingPublicItems
>(dashboardTradingPublicTableSelector);

export const dashboardTradingPublicReducer = tableReducerFactory<
  TTradingPublicStateData
>({
  type: DASHBOARD_TRADING_PUBLIC,
  paging: DEFAULT_CARD_PAGING,
  filtering: DASHBOARD_PUBLIC_FILTERING,
  defaultFilters: DASHBOARD_PUBLIC_DEFAULT_FILTERS
});
