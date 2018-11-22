import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const walletTransactionsSelector = state => state.wallet.transactions;
export const walletTableTransactionsSelector = tableSelectorCreator(
  walletTransactionsSelector,
  "transactions"
);
