import { TableItems } from "components/table/helpers/mapper";
import { tableSelectorCreator } from "components/table/helpers/table.selector";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import tableReducerFactory, {
  ITableState
} from "components/table/reducers/table.reducer";
import { IFundHistoryDataItem } from "pages/invest/funds/fund-details/fund-details.types";
import { RootState } from "reducers/root-reducer";

import {
  FUND_HISTORY,
  FUND_HISTORY_DEFAULT_FILTERS,
  FUND_HISTORY_FILTERS
} from "../fund-details.constants";

type TFundHistoryTableData = TableItems<IFundHistoryDataItem>;
export type THistoryTableState = ITableState<TFundHistoryTableData>;

const fundHistoryTableSelector = (state: RootState) =>
  state.fundDetails.fundHistory.historyTable;

export const fundHistoryTableTableSelector = tableSelectorCreator<
  RootState,
  TFundHistoryTableData,
  TFundHistoryTableData
>(fundHistoryTableSelector);

const fundHistoryTableReducer = tableReducerFactory<TFundHistoryTableData>({
  type: FUND_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: FUND_HISTORY_FILTERS,
  defaultFilters: FUND_HISTORY_DEFAULT_FILTERS
});

export default fundHistoryTableReducer;
