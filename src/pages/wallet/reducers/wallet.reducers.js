import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletCurrencyReducer from "./wallet-currency.reducer";

const walletReducer = combineReducers({
  balance: apiReducerFactory({
    apiType: WALLET_BALANCE
  }),
  currentCurrency: walletCurrencyReducer
});
export default walletReducer;
