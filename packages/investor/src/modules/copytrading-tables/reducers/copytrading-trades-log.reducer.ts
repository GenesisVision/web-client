import { SignalTradingEvents } from "gv-api-web";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import {
  CLEAR_COPYTRADING_TABLE,
  COPYTRADING_TRADES_LOG
} from "../actions/copytrading-tables.actions";

const copytradingTradesLogReducer = tableReducerFactory<SignalTradingEvents>({
  type: COPYTRADING_TRADES_LOG,
  paging: DEFAULT_PAGING,
  //@ts-ignore
  clearable: true,
  clearableActionType: CLEAR_COPYTRADING_TABLE
});

export default copytradingTradesLogReducer;
