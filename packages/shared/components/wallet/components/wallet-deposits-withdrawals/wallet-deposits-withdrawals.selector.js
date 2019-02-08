import { tableSelectorCreator } from "shared/components/table/helpers/table.selector";

const walletDepositsWithdrawalsSelector = state =>
  state.wallet.depositsWithdrawals;
export const walletTableDepositsWithdrawalsSelector = tableSelectorCreator(
  walletDepositsWithdrawalsSelector,
  "transactions"
);
