export const EVENT_TYPE_FILTER_NAME = "type";

export enum INVESTOR_EVENT_TYPE {
  All = "All",
  Invest = "Invest",
  Withdraw = "Withdraw",
  Profit = "Profit",
  Loss = "Loss",
  Reinvest = "Reinvest",
  Canceled = "Canceled",
  Ended = "Ended"
}

export enum MANAGER_EVENT_TYPE {
  All = "All",
  AssetStarted = "AssetStarted",
  ProgramPeriodStats = "ProgramPeriodStats",
  ProgramPeriodEnds = "ProgramPeriodEnds",
  InvestorInvest = "InvestorInvest",
  InvestorWithdraw = "InvestorWithdraw",
  ManagerInvest = "ManagerInvest",
  ManagerWithdraw = "ManagerWithdraw",
  AssetFinished = "AssetFinished",
  EntranceFee = "EntranceFee",
  ExitFee = "ExitFee"
}

export const INVESTOR_EVENT_TYPE_FILTER_VALUES = Object.keys(
  INVESTOR_EVENT_TYPE
).map(x => ({ value: x, label: x }));

export const MANAGER_EVENT_TYPE_FILTER_VALUES = Object.keys(
  MANAGER_EVENT_TYPE
).map(x => ({
  value: x,
  labelKey: `manager.dashboard-page.portfolio-events.types.${x}`
}));

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";
