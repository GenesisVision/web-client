import { WALLET_TRANSACTIONS_PAGING } from "../actions/wallet-actions.constants";

const initialState = {
  currentPage: 0,
  itemsOnPage: 10,
  totalPages: 1
};

const walletTransactionsPagingReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_TRANSACTIONS_PAGING:
      return {
        ...state,
        ...action.paging
      };
    default:
      return state;
  }
};

export default walletTransactionsPagingReducer;
