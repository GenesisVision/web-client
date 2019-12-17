import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_CARD_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import {
  ItemsViewModelProgramInvestingDetailsList,
  ProgramInvestingDetailsList
} from "gv-api-web";
import {
  DASHBOARD_INVESTMENTS_DEFAULT_FILTERS,
  DASHBOARD_INVESTMENTS_FILTERING
} from "pages/dashboard/dashboard.constants";
import { RootState } from "reducers/root-reducer";
import { ApiAction } from "utils/types";

export const DASHBOARD_INVESTMENTS_PROGRAMS = "DASHBOARD_INVESTMENTS_PROGRAMS";

export type TInvestmentsProgramsItems = ProgramInvestingDetailsList;
export type TInvestmentsProgramsStateData = ItemsViewModelProgramInvestingDetailsList;
export type TInvestmentsProgramsState = ITableState<
  TInvestmentsProgramsStateData
>;
export type TInvestmentsProgramsAction = ApiAction<
  TInvestmentsProgramsStateData
>;

export const dashboardInvestmentsProgramsTableSelector = (state: RootState) =>
  state.dashboard.investments.programs;

export const dashboardInvestmentsProgramsSelector = tableSelectorCreator<
  RootState,
  TInvestmentsProgramsStateData,
  TInvestmentsProgramsItems
>(dashboardInvestmentsProgramsTableSelector);

export const dashboardInvestmentsProgramsReducer = tableReducerFactory<
  TInvestmentsProgramsStateData
>({
  type: DASHBOARD_INVESTMENTS_PROGRAMS,
  paging: DEFAULT_CARD_PAGING,
  filtering: DASHBOARD_INVESTMENTS_FILTERING,
  defaultFilters: DASHBOARD_INVESTMENTS_DEFAULT_FILTERS
});
