import { combineReducers } from "redux";

import walletTransactionsReducer from "./wallet-transactions.reducer";
import { walletBalanceReducer } from "./wallet-balance.reducer";

const walletReducer = combineReducers({
  balance: walletBalanceReducer,
  transactions: walletTransactionsReducer
});
export default walletReducer;
