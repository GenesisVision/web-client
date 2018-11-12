import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletTransactionsReducer from "./wallet-transactions.reducer";

const walletReducer = combineReducers({
  balance: apiReducerFactory({
    apiType: WALLET_BALANCE
  }),
  transactions: walletTransactionsReducer
});
export default walletReducer;
