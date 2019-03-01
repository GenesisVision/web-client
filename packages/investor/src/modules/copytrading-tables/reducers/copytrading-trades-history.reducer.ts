import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_COPYTRADING_TABLE,
  COPYTRADING_TRADES_HISTORY
} from "../actions/copytrading-tables.actions";
import {
  COPYTRADING_TRADES_HISTORY_DEFAULT_FILTERING,
  COPYTRADING_TRADES_HISTORY_FILTERS
} from "../components/copytrading-tables.constants";

const copytradingTradesHistoryReducer = tableReducerFactory({
  type: COPYTRADING_TRADES_HISTORY,
  paging: DEFAULT_PAGING,
  filtering: COPYTRADING_TRADES_HISTORY_DEFAULT_FILTERING,
  defaultFilters: COPYTRADING_TRADES_HISTORY_FILTERS,
  clearable: true,
  clearableActionType: CLEAR_COPYTRADING_TABLE
});

export default copytradingTradesHistoryReducer;
