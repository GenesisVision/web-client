export const EVENT_TYPE_FILTER_NAME = "eventType";

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

export const EVENT_TYPE_FILTER_DEFAULT_VALUE = "All";

export type EventTypeFilterType = INVESTOR_EVENT_TYPE & MANAGER_EVENT_TYPE;

export type ComposedRequestEventTypeName = "type";
export type ComposedRequestEventTypeValue = EventTypeFilterType;
