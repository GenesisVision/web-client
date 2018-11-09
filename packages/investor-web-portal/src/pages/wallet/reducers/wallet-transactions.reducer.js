import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import tableReducerFactory from "modules/table/reducers/table.reducer";

import { WALLET_TRANSACTIONS } from "../actions/wallet.actions";
import { WALLET_TRANSACTIONS_DEFAULT_FILTERING } from "../components/wallet-transactions/wallet-transactions.constants";

const walletTransactionsReducer = tableReducerFactory({
  type: WALLET_TRANSACTIONS,
  paging: DEFAULT_PAGING,
  filtering: WALLET_TRANSACTIONS_DEFAULT_FILTERING
});

export default walletTransactionsReducer;
