import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  DashboardTradingAsset,
  ItemsViewModelDashboardTradingAsset
} from "gv-api-web";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { ApiAction } from "utils/types";

export const DASHBOARD_INVESTMENTS_MOST_PROFITABLE =
  "DASHBOARD_INVESTMENTS_MOST_PROFITABLE";

export type TInvestmentsMostProfitableItems = DashboardTradingAsset;
export type TInvestmentsMostProfitableStateData = ItemsViewModelDashboardTradingAsset;
export type TInvestmentsMostProfitableState = ITableState<
  TInvestmentsMostProfitableStateData
>;
export type TInvestmentsMostProfitableAction = ApiAction<
  TInvestmentsMostProfitableStateData
>;

export const dashboardInvestmentsMostProfitableTableSelector = (
  state: RootState
) => state.dashboard.investments.mostProfitable;

export const dashboardInvestmentsMostProfitableSelector = tableSelectorCreator<
  RootState,
  TInvestmentsMostProfitableStateData,
  TInvestmentsMostProfitableItems
>(dashboardInvestmentsMostProfitableTableSelector);

export const dashboardInvestmentsMostProfitableItemsSelector = createSelector(
  dashboardInvestmentsMostProfitableSelector,
  (state: TInvestmentsMostProfitableState) =>
    state.itemsData.data ? state.itemsData.data.items : undefined
);

export const dashboardInvestmentsMostProfitableReducer = tableReducerFactory<
  TInvestmentsMostProfitableStateData
>({
  type: DASHBOARD_INVESTMENTS_MOST_PROFITABLE,
  paging: DEFAULT_CARD_PAGING
});
