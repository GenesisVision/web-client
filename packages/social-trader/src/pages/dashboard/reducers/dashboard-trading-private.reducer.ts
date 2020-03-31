import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  DashboardTradingAsset,
  DashboardTradingAssetItemsViewModel
} from "gv-api-web";
import {
  DASHBOARD_PUBLIC_DEFAULT_FILTERS,
  DASHBOARD_PUBLIC_FILTERING
} from "pages/dashboard/dashboard.constants";
import { RootState } from "reducers/root-reducer";
import { ApiAction } from "utils/types";

export const DASHBOARD_TRADING_PRIVATE = "DASHBOARD_TRADING_PRIVATE";

export type TTradingPrivateItems = DashboardTradingAsset;
export type TTradingPrivateStateData = DashboardTradingAssetItemsViewModel;
export type TTradingPrivateState = ITableState<TTradingPrivateStateData>;
export type TTradingPrivateAction = ApiAction<TTradingPrivateStateData>;

export const dashboardTradingPrivateTableSelector = (state: RootState) =>
  state.dashboard.trading.private;

export const dashboardTradingPrivateSelector = tableSelectorCreator<
  RootState,
  TTradingPrivateStateData,
  TTradingPrivateItems
>(dashboardTradingPrivateTableSelector);

export const dashboardTradingPrivateReducer = tableReducerFactory<
  TTradingPrivateStateData
>({
  type: DASHBOARD_TRADING_PRIVATE,
  paging: DEFAULT_CARD_PAGING,
  filtering: DASHBOARD_PUBLIC_FILTERING,
  defaultFilters: DASHBOARD_PUBLIC_DEFAULT_FILTERS
});
