import {
  ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  ASSET_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_EVENTS_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import { InvestmentEventViewModels } from "gv-api-web";
import { RootState } from "reducers/root-reducer";

type TFundEventsData = InvestmentEventViewModels;
export type TFundEventsState = ITableState<TFundEventsData>;

export const fundEventsSelector = (state: RootState) =>
  state.fundDetails.fundHistory.events;

export const fundEventsTableSelector = tableSelectorCreator<
  RootState,
  TFundEventsData,
  TFundEventsData
>(fundEventsSelector, "events");

export const fundEventsReducer = tableReducerFactory<TFundEventsData>({
  clearable: true,
  type: EVENTS_ACTION_TYPE,
  paging: DEFAULT_EVENTS_PAGING,
  filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
});
