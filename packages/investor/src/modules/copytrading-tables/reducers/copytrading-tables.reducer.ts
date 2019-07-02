import { SignalTradingEvents, TradesSignalViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import { ITableState } from "shared/components/table/reducers/table.reducer";

import copytradingOpenTradesReducer from "./copytrading-open-trades.reducer";
import copytradingTradesHistoryReducer from "./copytrading-trades-history.reducer";
import copytradingTradesLogReducer from "./copytrading-trades-log.reducer";

export type CopytradingTablesState = Readonly<{
  openTrades: ITableState<TradesSignalViewModel>;
  tradesHistory: ITableState<TradesSignalViewModel>;
  tradesLog: ITableState<SignalTradingEvents>;
}>;

const copytradingTablesReducer = combineReducers<CopytradingTablesState>({
  openTrades: copytradingOpenTradesReducer,
  tradesLog: copytradingTradesLogReducer,
  tradesHistory: copytradingTradesHistoryReducer
});

export default copytradingTablesReducer;
