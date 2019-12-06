import { WalletSummary } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

import { WALLET_BALANCE } from "../actions/wallet.actions";
import walletLastUpdateReducer, {
  WalletLastUpdateState
} from "./wallet-last-update";

export type WalletState = Readonly<{
  info: IApiState<WalletSummary>;
  lastUpdate: WalletLastUpdateState;
}>;

export const walletSelector = apiSelector<WalletSummary>(
  state => state.wallet.info
);

export const walletsSelector = apiFieldSelector(
  walletSelector,
  fieldSelector(state => state.wallets),
  []
);

export const grandTotalSelector = apiFieldSelector(
  walletSelector,
  fieldSelector(state => state.grandTotal)
);

export const walletReducer = combineReducers<WalletState>({
  info: apiReducerFactory<WalletSummary>({
    apiType: WALLET_BALANCE
  }),
  lastUpdate: walletLastUpdateReducer
});
