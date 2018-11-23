import { UPDATE_WALLET_BALANCE } from "../actions/wallet.actions";

const initialState = {
  availableGVT: 0,
  investedGVT: 0,
  totalBalanceGVT: 0,
  availableCurrency: 0,
  investedCurrency: 0,
  totalBalanceCurrency: 0
};

export const walletBalanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WALLET_BALANCE:
      return {
        ...state,
        ...action.wallet
      };
    default:
      return state;
  }
};
