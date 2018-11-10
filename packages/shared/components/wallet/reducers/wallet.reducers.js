import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { WALLET_BALANCE } from "../actions/wallet.actions";

const walletReducer = combineReducers({
  balance: apiReducerFactory({
    apiType: WALLET_BALANCE
  })
});
export default walletReducer;
