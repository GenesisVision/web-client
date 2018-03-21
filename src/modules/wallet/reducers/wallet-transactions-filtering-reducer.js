import filteringReducerFactory from "../../filtering/reducers/filtering-reducers";

import { WALLET_TRANSACTIONS } from "../actions/wallet-actions.constants";
import { WALLET_FILTERS } from "../helpers/wallet-constants";

const walletTransactionsFilteringReducer = filteringReducerFactory({
  api: WALLET_TRANSACTIONS,
  filters: WALLET_FILTERS
});

export default walletTransactionsFilteringReducer;
