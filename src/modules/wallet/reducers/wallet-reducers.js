import { combineReducers } from "redux";

import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";
import walletAddressReducer from "./wallet-address-reducer";
import walletChartReducer from "./wallet-chart-reducer";
import walletFilterPaneReducer from "./wallet-filter-pane-reducer";
import walletTransactionProgramFilterRequestReducer from "./wallet-transaction-filter-reducer";
import walletTransactionsFilteringReducer from "./wallet-transactions-filtering-reducer";
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
    paging: walletTransactionsPagingReducer,
    filtering: walletTransactionsFilteringReducer
  }),
  filterPane: combineReducers({
    state: walletFilterPaneReducer,
    transactionPrograms: walletTransactionProgramFilterRequestReducer
  })
});
export default walletReducer;
