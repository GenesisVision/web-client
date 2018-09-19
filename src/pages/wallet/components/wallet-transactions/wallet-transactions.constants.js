import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "modules/table/components/filtering/date-range-filter/date-range-filter.helpers";

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

export const WALLET_TRANSACTIONS_FILTERS = [
  {
    ...composeDefaultDateRangeFilter()
  }
];

export const WALLET_TRANSACTIONS_DEFAULT_FILTERING = [
  {
    dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
  }
];

export const WALLET_TRANSACTIONS_TYPES_ENUM = {
  Wallet: "wallet",
  Program: "program",
  Fund: "fund",
  ProgramRequest: "program-request",
  WithdrawalRequest: "withdrawal-request",
  PaymentTransaction: "payment-transaction"
};
