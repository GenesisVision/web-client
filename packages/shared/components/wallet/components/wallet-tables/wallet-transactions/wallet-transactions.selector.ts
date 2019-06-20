import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const walletTransactionsSelector = (state: any) => state.wallet.transactions; // TODO change state type
export const walletTableTransactionsSelector = tableSelectorCreator(
  walletTransactionsSelector,
  "transactions"
);
