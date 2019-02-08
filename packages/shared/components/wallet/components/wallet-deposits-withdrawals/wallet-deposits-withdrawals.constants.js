import { ASSET_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { DEFAULT_DATE_RANGE_FILTER_VALUE } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { EVENT_TYPE_FILTER_DEFAULT_VALUE } from "shared/components/table/components/filtering/event-type-filter/event-type-filter.constants";

import { composeDefaultDepositsWithdrawalsTypeFilter } from "./wallet-deposits-withdrawals-type-filter.helpers";

export const WALLET_DEPOSITS_WITHDRAWALS_COLUMNS = [
  {
    name: "date"
  },
  {
    name: "status"
  },
  {
    name: "amount"
  }
];

export const WALLET_DEPOSITS_WITHDRAWALS_COLUMNS_TOTAL = [
  {
    name: "wallet"
  },
  {
    name: "date"
  },
  {
    name: "status"
  },
  {
    name: "amount"
  }
];

export const WALLET_DEPOSITS_WITHDRAWALS_FILTERS_DEFAULT = [
  {
    ...composeDefaultDateRangeFilter()
  },
  { ...composeDefaultDepositsWithdrawalsTypeFilter() }
];

export const WALLET_DEPOSITS_WITHDRAWALS_DEFAULT_FILTERING = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE,
  assetType: ASSET_TYPE_FILTER_DEFAULT_VALUE,
  type: EVENT_TYPE_FILTER_DEFAULT_VALUE,
  txAction: undefined
};

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
