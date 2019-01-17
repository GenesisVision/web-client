export const EVENT_TYPE_FILTER_NAME = "type";

export const INVESTOR_EVENT_TYPE = {
  All: "All",
  Invest: "Invest",
  Withdraw: "Withdraw",
  Profit: "Profit",
  Loss: "Loss",
  Reinvest: "Reinvest",
  Canceled: "Canceled",
  Ended: "Ended"
};

export const MANAGER_EVENT_TYPE = {
  All: "All",
  AssetStarted: "AssetStarted",
  ProgramPeriodStats: "ProgramPeriodStats",
  ProgramPeriodEnds: "ProgramPeriodEnds",
  InvestorInvest: "InvestorInvest",
  InvestorWithdraw: "InvestorWithdraw",
  ManagerInvest: "ManagerInvest",
  ManagerWithdraw: "ManagerWithdraw",
  AssetFinished: "AssetFinished",
  EntranceFee: "EntranceFee",
  ExitFee: "ExitFee"
};

export const INVESTOR_EVENT_TYPE_FILTER_VALUES = [
  ...Object.keys(INVESTOR_EVENT_TYPE)
].map(x => ({ value: x, label: x }));

export const MANAGER_EVENT_TYPE_FILTER_VALUES = [
  ...Object.entries(MANAGER_EVENT_TYPE)
].map(([key, value]) => ({
  value: key,
  labelKey: `manager.dashboard-page.portfolio-events.types.${value}`
}));

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";
