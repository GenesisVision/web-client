import { WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";
import { DeepReadonly } from "utility-types";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletTransactionsReducer from "./wallet-transactions.reducer";

export type WalletState = DeepReadonly<{
  info: IApiReducerFactory<WalletMultiSummary>;
  transactions: any;
}>;

const walletReducer = combineReducers<WalletState>({
  info: apiReducerFactory<WalletMultiSummary>({
    apiType: WALLET_BALANCE
  }),
  transactions: walletTransactionsReducer
});

export default walletReducer;
