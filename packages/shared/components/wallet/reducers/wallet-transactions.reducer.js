import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import tableReducerFactory from "shared/components/table/reducers/table.reducer";

import { WALLET_TRANSACTIONS } from "../actions/wallet.actions";
import {
  WALLET_TRANSACTIONS_DEFAULT_FILTERING,
  WALLET_TRANSACTIONS_FILTERS_DEFAULT
} from "../components/wallet-transactions/wallet-transactions.constants";

const walletTransactionsReducer = tableReducerFactory({
  type: WALLET_TRANSACTIONS,
  paging: DEFAULT_PAGING,
  filtering: WALLET_TRANSACTIONS_DEFAULT_FILTERING,
  defaultFilters: WALLET_TRANSACTIONS_FILTERS_DEFAULT
});

export default walletTransactionsReducer;
