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
