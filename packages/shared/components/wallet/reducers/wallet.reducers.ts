import { CopyTradingAccountsList, WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import {
  apiFieldSelector,
  apiSelector,
  fieldSelector
} from "shared/utils/selectors";

import {
  COPYTRADING_ACCOUNTS,
  WALLET_BALANCE
} from "../actions/wallet.actions";
import { AccountLastUpdateState } from "./account-last-update";
import walletLastUpdateReducer, {
  WalletLastUpdateState
} from "./wallet-last-update";

export type WalletState = Readonly<{
  info: IApiState<WalletMultiSummary>;
  lastUpdate: WalletLastUpdateState;
}>;

export const walletSelector = apiSelector<WalletMultiSummary>(
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
  info: apiReducerFactory<WalletMultiSummary>({
    apiType: WALLET_BALANCE
  }),
  lastUpdate: walletLastUpdateReducer
});

export type CopyTradingAccountsState = Readonly<{
  info: IApiState<CopyTradingAccountsList>;
  lastUpdate: AccountLastUpdateState;
}>;

export const copyTradingAccountsDataSelector = apiSelector<
  CopyTradingAccountsList
>(state => state.copyTradingAccounts.info);

export const copyTradingAccountsSelector = apiFieldSelector(
  copyTradingAccountsDataSelector,
  fieldSelector(state => state.accounts),
  []
);

export const CopyTradingAccountsReducer = combineReducers<
  CopyTradingAccountsState
>({
  info: apiReducerFactory<CopyTradingAccountsList>({
    apiType: COPYTRADING_ACCOUNTS
  }),
  lastUpdate: walletLastUpdateReducer
});
