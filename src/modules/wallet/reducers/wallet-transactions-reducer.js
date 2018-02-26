import apiReducerFactory from "../../../shared/reducers/api-reducer/api-reducer";

import { WALLET_TRANSACTIONS } from "../actions/wallet-actions.constants";

const walletTransactionsReducer = apiReducerFactory({
  apiType: WALLET_TRANSACTIONS
});

export default walletTransactionsReducer;
