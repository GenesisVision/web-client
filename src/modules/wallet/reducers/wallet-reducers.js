import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import walletAddressReducer from "./wallet-address-reducer";
import walletChartReducer from "./wallet-chart-reducer";
import walletTransactionsPagingReducer from "./wallet-transactions-paging-reducer";
import walletTransactionsReducer from "./wallet-transactions-reducer";
import walletWithdrawReducer from "./wallet-withdraw-reducer";

import { WALLET } from "../actions/wallet-actions.constants";

const walletReducer = combineReducers({
  wallet: apiReducerFactory({ apiType: WALLET }),
  withdraw: walletWithdrawReducer,
  address: walletAddressReducer,
  chart: walletChartReducer,
  transactions: combineReducers({
    items: walletTransactionsReducer,
    paging: walletTransactionsPagingReducer
  })
});
export default walletReducer;
