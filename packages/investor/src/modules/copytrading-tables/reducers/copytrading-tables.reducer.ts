import { TradesHistorySignalSlaveViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { ITableState } from "shared/components/table/reducers/table.reducer";

import copytradingOpenTradesReducer from "./copytrading-open-trades.reducer";
import copytradingTradesHistoryReducer from "./copytrading-trades-history.reducer";

export type CopytradingTablesState = Readonly<{
  openTrades: ITableState<TradesHistorySignalSlaveViewModel>;
  tradesHistory: ITableState<TradesHistorySignalSlaveViewModel>;
}>;

const copytradingTablesReducer = combineReducers<CopytradingTablesState>({
  openTrades: copytradingOpenTradesReducer,
  tradesHistory: copytradingTradesHistoryReducer
});

export default copytradingTablesReducer;
