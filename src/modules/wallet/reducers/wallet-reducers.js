import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET } from "../actions/wallet-actions.constants";
import { combineReducers } from "redux";
import walletWithdrawReducer from "./wallet-withdraw-reducer";
import walletAddressReducer from "./wallet-address-reducer";
import walletTransactionsReducer from "./wallet-transactions-reducer";

const walletReducer = combineReducers({
  wallet: apiReducerFactory({ apiType: WALLET }),
  withdraw: walletWithdrawReducer,
  address: walletAddressReducer,
  transactions: walletTransactionsReducer
});
export default walletReducer;
