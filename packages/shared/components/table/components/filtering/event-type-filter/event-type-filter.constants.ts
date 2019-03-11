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
  ProgramPeriodStarts = "ProgramPeriodStarts",
  ProgramPeriodEnds = "ProgramPeriodEnds",
  InvestorInvest = "InvestorInvest",
  InvestorWithdraw = "InvestorWithdraw",
  ManagerInvest = "ManagerInvest",
  ManagerWithdraw = "ManagerWithdraw",
  AssetFinished = "AssetFinished",
  EntranceFee = "EntranceFee",
  ExitFee = "ExitFee"
}

interface IINVESTOR_EVENT_TYPE_FILTER_VALUES {
  value: INVESTOR_EVENT_TYPE;
  label: INVESTOR_EVENT_TYPE;
}

interface IMANAGER_EVENT_TYPE_FILTER_VALUES {
  value: MANAGER_EVENT_TYPE;
  labelKey: string;
}

export const INVESTOR_EVENT_TYPE_FILTER_VALUES: IINVESTOR_EVENT_TYPE_FILTER_VALUES[] = Object.values(
  INVESTOR_EVENT_TYPE
).map(x => ({ value: x, label: x }));

export const MANAGER_EVENT_TYPE_FILTER_VALUES: IMANAGER_EVENT_TYPE_FILTER_VALUES[] = Object.values(
  MANAGER_EVENT_TYPE
).map(x => ({
  value: x,
  labelKey: `manager.dashboard-page.portfolio-events.types.${x}`
}));

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";
