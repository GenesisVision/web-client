import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import { ItemsViewModelReallocationModel } from "gv-api-web";
import { RootState } from "reducers/root-reducer";

import {
  FUND_REALLOCATE_HISTORY,
  FUND_REBALANCING_DEFAULT_FILTERS,
  FUND_REBALANCING_FILTERS
} from "../fund-details.constants";

type TFundReallocateHistoryData = ItemsViewModelReallocationModel;
export type TReallocateHistoryState = ITableState<TFundReallocateHistoryData>;

const fundReallocateHistorySelector = (state: RootState) =>
  state.fundDetails.fundHistory.reallocateHistory;

export const fundReallocateHistoryTableSelector = tableSelectorCreator<
  RootState,
  TFundReallocateHistoryData,
  TFundReallocateHistoryData
>(fundReallocateHistorySelector);

const fundReallocateHistoryReducer = tableReducerFactory<
  TFundReallocateHistoryData
>({
  type: FUND_REALLOCATE_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: FUND_REBALANCING_FILTERS,
  defaultFilters: FUND_REBALANCING_DEFAULT_FILTERS
});

export default fundReallocateHistoryReducer;
