import { combineReducers } from "redux";

import copytradingOpenTradesReducer from "./copytrading-open-trades.reducer";
import copytradingTradesHistoryReducer from "./copytrading-trades-history.reducer";

export type CopytradingTablesState = Readonly<{
  openTrades: any;
  tradesHistory: any;
}>;

const copytradingTablesReducer = combineReducers<CopytradingTablesState>({
  openTrades: copytradingOpenTradesReducer,
  tradesHistory: copytradingTradesHistoryReducer
});

export default copytradingTablesReducer;
