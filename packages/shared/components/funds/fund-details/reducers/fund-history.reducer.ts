import {
  FundAssetsListInfo,
  InvestmentEventViewModels,
  ReallocationsViewModel
} from "gv-api-web";
import { combineReducers } from "redux";
import {
  ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
  ASSET_PORTFOLIO_EVENTS_FILTERS,
  EVENTS_ACTION_TYPE
} from "shared/components/portfolio-events-table/portfolio-events-table.constants";
import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "shared/components/table/reducers/table.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";
import { RootState } from "shared/reducers/root-reducer";

import fundReallocateHistoryReducer from "./fund-reallocate-history.reducer";
import fundStructureReducer from "./fund-structure.reducer";

export type FundAssetsViewModel = FundAssetsListInfo & { total: number };

export type FundHistoryState = Readonly<{
  events: ITableState<InvestmentEventViewModels>;
  reallocateHistory: ITableState<ReallocationsViewModel>;
  fundStructure: ITableState<FundAssetsViewModel>;
}>;

export const fundEventsSelector = (state: RootState) =>
  state.fundDetails.fundHistory.events;

export const fundEventsTableSelector = tableSelectorCreator<
  RootState,
  InvestmentEventViewModels,
  InvestmentEventViewModels
>(fundEventsSelector, "events");

export const fundEventsReducer = tableReducerFactory<InvestmentEventViewModels>(
  {
    clearable: true,
    type: EVENTS_ACTION_TYPE,
    paging: DEFAULT_PAGING,
    filtering: ASSET_PORTFOLIO_EVENTS_DEFAULT_FILTERING,
    defaultFilters: ASSET_PORTFOLIO_EVENTS_FILTERS
  }
);

const fundHistoryReducer = clearableReducer(
  combineReducers<FundHistoryState>({
    events: fundEventsReducer,
    reallocateHistory: fundReallocateHistoryReducer,
    fundStructure: fundStructureReducer
  })
);

export default fundHistoryReducer;
