export const EVENT_TYPE_FILTER_NAME = "type";

export const EVENTS_TYPES = {
  All: "All",
  Invest: "Invest",
  Withdraw: "Withdraw",
  Profit: "Profit",
  Loss: "Loss",
  Reinvest: "Reinvest",
  Canceled: "Canceled",
  Ended: "Ended"
};

export const EVENT_TYPE_FILTER_VALUES = [...Object.keys(EVENTS_TYPES)].map(
  x => ({ value: x, label: x })
);

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";
