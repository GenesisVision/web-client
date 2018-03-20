import { WALLET_TRANSACTIONS_FILTERING } from "../actions/wallet-actions.constants";

const initialState = {
  investmentProgramId: "",
  type: "All"
};

const walletTransactionsFilteringReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_TRANSACTIONS_FILTERING:
      return {
        ...state,
        ...action.filtering
      };
    default:
      return state;
  }
};

export default walletTransactionsFilteringReducer;
