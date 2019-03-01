import { WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiReducerFactory
} from "shared/reducers/api-reducer/api-reducer";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletLastUpdateReducer, {
  WalletLastUpdateState
} from "./wallet-last-update";

export type WalletState = Readonly<{
  info: IApiReducerFactory<WalletMultiSummary>;
  lastUpdate: WalletLastUpdateState;
}>;

const walletReducer = combineReducers<WalletState>({
  info: apiReducerFactory<WalletMultiSummary>({
    apiType: WALLET_BALANCE
  }),
  lastUpdate: walletLastUpdateReducer
});

export default walletReducer;
