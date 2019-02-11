export const TAG_FILTER_NAME = "tags";

export enum TAGS {
  All = "All",
  Invest = "Invest",
  Withdraw = "Withdraw",
  Profit = "Profit",
  Loss = "Loss",
  Reinvest = "Reinvest",
  Canceled = "Canceled",
  Ended = "Ended"
}

export const TAG_FILTER_VALUES = Object.keys(TAGS).map(x => ({
  value: x,
  label: x
}));

export const TAG_FILTER_DEFAULT_VALUE = "All";
