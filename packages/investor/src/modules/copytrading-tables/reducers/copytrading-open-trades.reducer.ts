import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_COPYTRADING_TABLE,
  COPYTRADING_OPEN_TRADES
} from "../actions/copytrading-tables.actions";

const copytradingOpenTradesReducer = tableReducerFactory({
  type: COPYTRADING_OPEN_TRADES,
  paging: DEFAULT_PAGING,
  clearable: true,
  clearableActionType: CLEAR_COPYTRADING_TABLE
});

export default copytradingOpenTradesReducer;
