import { WalletBaseData, WalletSummary } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { combineReducers } from "redux";
import { apiFieldSelector, apiSelector, fieldSelector } from "utils/selectors";

import {
  WALLET_BALANCE,
  WALLET_BALANCE_BY_CURRENCY_AVAILABLE
} from "../actions/wallet.actions";
import walletLastUpdateReducer, {
  WalletLastUpdateState
} from "./wallet-last-update";

export type WalletState = Readonly<{
  info: IApiState<WalletSummary>;
  walletAvailable: IApiState<WalletsAvailableStateType>;
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

export const discountPercentSelector = apiFieldSelector(
  walletSelector,
  fieldSelector(state => state.genesisMarketsDiscountPercent)
);

export type WalletsAvailableStateType = Array<WalletBaseData>;

export const walletsAvailableStateSelector = apiSelector<
  WalletsAvailableStateType
>(state => state.wallet.walletAvailable);

export const walletsAvailableSelector = apiFieldSelector(
  walletsAvailableStateSelector,
  fieldSelector(state => state),
  []
);

const walletAvailableReducer = apiReducerFactory<WalletsAvailableStateType>({
  apiType: WALLET_BALANCE_BY_CURRENCY_AVAILABLE
});

export const walletReducer = combineReducers<WalletState>({
  walletAvailable: walletAvailableReducer,
  info: apiReducerFactory<WalletSummary>({
    apiType: WALLET_BALANCE
  }),
  lastUpdate: walletLastUpdateReducer
});
