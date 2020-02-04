export const WALLET_TRANSACTIONS_COLUMNS = [
  {
    name: "date"
  },
  {
    name: "type"
  },
  {
    name: "description"
  },
  {
    name: "amount"
  }
];

export const WALLET_TOTAL_TRANSACTIONS_COLUMNS = [
  {
    name: "wallet"
  },
  ...WALLET_TRANSACTIONS_COLUMNS
];
