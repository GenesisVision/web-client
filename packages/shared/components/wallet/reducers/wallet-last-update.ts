import { WALLET_LAST_UPDATE } from "../actions/wallet.actions";

export type WalletLastUpdateState = {
  timestamp: Date;
};

const initialState: WalletLastUpdateState = {
  timestamp: new Date()
};

const walletLastUpdateReducer = (
  state: WalletLastUpdateState = initialState,
  action: any
): WalletLastUpdateState => {
  switch (action.type) {
    case WALLET_LAST_UPDATE:
      return { timestamp: action.payload };
    default:
      return state;
  }
};

export default walletLastUpdateReducer;
