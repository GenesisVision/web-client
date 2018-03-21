import pagingReducerFactory from "../../paging/reducers/paging-reducers";

import { WALLET_TRANSACTIONS } from "../actions/wallet-actions.constants";

const walletTransactionsPagingReducer = pagingReducerFactory(
  WALLET_TRANSACTIONS
);

export default walletTransactionsPagingReducer;
