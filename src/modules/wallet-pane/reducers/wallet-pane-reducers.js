import { combineReducers } from "redux";

import walletPaneTransactionsReducer from "./wallet-pane-transactions-reducer";

const walletPaneReducer = combineReducers({
  transactions: walletPaneTransactionsReducer
});
export default walletPaneReducer;
