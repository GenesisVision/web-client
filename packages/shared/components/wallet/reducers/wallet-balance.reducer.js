import { WALLET_BALANCE } from "shared/components/wallet/actions/wallet.actions";

const initialState = {
  availableGVT: 0,
  investedGVT: 0,
  totalBalanceGVT: 0,
  availableCurrency: 0,
  investedCurrency: 0,
  totalBalanceCurrency: 0
};

export const walletBalanceReducer = (state = initialState, action) => {
  if (action.type === WALLET_BALANCE) {
    return {
      ...state,
      ...action.wallet
    };
  }
  return state;
};
