export const WALLET_LIST_COLUMNS = [
  {
    name: "currency"
  },
  {
    name: "total-balance"
  },
  {
    name: "available"
  },
  {
    name: "invested"
  },
  {
    name: "pending"
  },
  {
    name: "buttons"
  }
];

export const WALLET_TOTAL_TRANSACTIONS_COLUMNS = [
  {
    name: "wallet"
  },
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

export const WALLET_TRANSACTION_ACTIONS_VALUES = [
  { value: undefined, label: "All" },
  { value: "Transfer", label: "Transfer" },
  { value: "ProgramOpen", label: "Program open" },
  { value: "ProgramProfit", label: "Program profit" },
  { value: "ProgramInvest", label: "Program invest" },
  { value: "ProgramWithdrawal", label: "Program withdrawal" },
  {
    value: "ProgramRefundPartialExecution",
    label: "Program refund partial execution"
  },
  { value: "ProgramRefundClose", label: "Program refund close" },
  { value: "ProgramRequestInvest", label: "Program request invest" },
  { value: "ProgramRequestWithdrawal", label: "Program request withdrawal" },
  { value: "ProgramRequestCancel", label: "Program request cancel" }
];
