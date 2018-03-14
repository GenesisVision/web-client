import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import walletAddressReducer from "./wallet-address-reducer";
import walletChartReducer from "./wallet-chart-reducer";
import walletTransactionProgramFilterReducer from "./wallet-transaction-filter-reducer";
import walletTransactionsReducer from "./wallet-transactions-reducer";
import walletWithdrawReducer from "./wallet-withdraw-reducer";

import { WALLET } from "../actions/wallet-actions.constants";

const walletReducer = combineReducers({
  wallet: apiReducerFactory({ apiType: WALLET }),
  withdraw: walletWithdrawReducer,
  address: walletAddressReducer,
  chart: walletChartReducer,
  transactions: walletTransactionsReducer,
  transactionProgramFilters: walletTransactionProgramFilterReducer
});
export default walletReducer;
