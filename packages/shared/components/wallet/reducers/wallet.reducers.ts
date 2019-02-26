import { WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import {
  WALLET_BALANCE,
  WALLET_TRANSACTIONS_FILTERS
} from "../actions/wallet.actions";

export type WalletState = DeepReadonly<{
  info: IApiReducerFactory<WalletMultiSummary>;
}>;

const walletReducer = combineReducers<WalletState>({
  info: apiReducerFactory<WalletMultiSummary>({
    apiType: WALLET_BALANCE
  })
});

export default walletReducer;
