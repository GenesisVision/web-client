import { WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletTransactionsReducer from "./wallet-transactions.reducer";

export interface IWalletReducer {
  info: IApiReducerFactory<WalletMultiSummary>;
  transactions: any;
}

const walletReducer = combineReducers<IWalletReducer>({
  info: apiReducerFactory<WalletMultiSummary>({
    apiType: WALLET_BALANCE
  }),
  transactions: walletTransactionsReducer
});

export default walletReducer;
