import { CopyTradingAccountsList, WalletMultiSummary } from "gv-api-web";
import { combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";

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

export const CopyTradingAccountsReducer = combineReducers<
  CopyTradingAccountsState
>({
  info: apiReducerFactory<CopyTradingAccountsList>({
    apiType: COPYTRADING_ACCOUNTS
  }),
  lastUpdate: walletLastUpdateReducer
});
