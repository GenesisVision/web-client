import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  FundInvestingDetailsList,
  ItemsViewModelFundInvestingDetailsList
} from "gv-api-web";
import {
  DASHBOARD_INVESTMENTS_DEFAULT_FILTERS,
  DASHBOARD_INVESTMENTS_FILTERING
} from "pages/dashboard/dashboard.constants";
import { RootState } from "reducers/root-reducer";
import { ApiAction } from "utils/types";

export const DASHBOARD_INVESTMENTS_FUNDS = "DASHBOARD_INVESTMENTS_FUNDS";

export type TInvestmentsFundsItems = FundInvestingDetailsList;
export type TInvestmentsFundsStateData = ItemsViewModelFundInvestingDetailsList;
export type TInvestmentsFundsState = ITableState<TInvestmentsFundsStateData>;
export type TInvestmentsFundsAction = ApiAction<TInvestmentsFundsStateData>;

export const dashboardInvestmentsFundsTableSelector = (state: RootState) =>
  state.dashboard.investments.funds;

export const dashboardInvestmentsFundsSelector = tableSelectorCreator<
  RootState,
  TInvestmentsFundsStateData,
  TInvestmentsFundsItems
>(dashboardInvestmentsFundsTableSelector);

export const dashboardInvestmentsFundsReducer = tableReducerFactory<
  TInvestmentsFundsStateData
>({
  type: DASHBOARD_INVESTMENTS_FUNDS,
  paging: DEFAULT_CARD_PAGING,
  filtering: DASHBOARD_INVESTMENTS_FILTERING,
  defaultFilters: DASHBOARD_INVESTMENTS_DEFAULT_FILTERS
});
