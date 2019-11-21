import defaultReducer from "reducers/reducer-creators/default-reducer";

import {
  UpdateTimestampAction,
  WALLET_LAST_UPDATE
} from "../actions/wallet.actions";

export type WalletLastUpdateState = {
  timestamp: Date;
};

const initialState: WalletLastUpdateState = {
  timestamp: new Date()
};

const walletLastUpdateReducer = (
  state: WalletLastUpdateState = initialState,
  action: UpdateTimestampAction
): WalletLastUpdateState =>
  defaultReducer<UpdateTimestampAction, WalletLastUpdateState>(
    action,
    state,
    initialState,
    WALLET_LAST_UPDATE
  );

export default walletLastUpdateReducer;
