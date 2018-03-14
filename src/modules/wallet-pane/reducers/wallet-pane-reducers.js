import { combineReducers } from "redux";

import walletPaneTransactionsReducer from "./wallet-pane-transactions-reducer";
import walletPaneChartReducer from "./wallet-pane-chart-reducer";

const walletPaneReducer = combineReducers({
  chart: walletPaneChartReducer,
  transactions: walletPaneTransactionsReducer
});
export default walletPaneReducer;
