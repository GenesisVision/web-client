import {
  AbsoluteProfitChart,
  InvestmentEventViewModels,
  LevelsParamsInfo,
  ProgramBalanceChart,
  ProgramFollowDetailsFull,
  ProgramPeriodsViewModel,
  ProgramProfitPercentCharts,
  SignalProviderSubscribers,
  TradesSignalViewModel,
  TradesViewModel
} from "gv-api-web";
import { CurrencyEnum } from "utils/types";

export interface IProgramHistoryCounts {
  trades: number;
  periods: number;
  tradingLog: number;
  openPositions: number;
  subscriptions: number;
  financialStatistic: number;
}

export interface ILevelCalculatorProps {
  id: string;
  title: string;
  currency: CurrencyEnum;
  levelsParameters: LevelsParamsInfo;
  isKycConfirmed: boolean;
}

export type ProgramAbsoluteProfitChartDataType = AbsoluteProfitChart;
export type ProgramProfitChartDataType = ProgramProfitPercentCharts;
export type ProgramDescriptionDataType = ProgramFollowDetailsFull;
export type ProgramBalanceChartDataType = ProgramBalanceChart;
export type SignalProviderSubscribersDataType = SignalProviderSubscribers;
export type ProgramPeriodsDataType = ProgramPeriodsViewModel;
export type OpenTradesDataType = TradesViewModel;
export type TradesDataType = TradesSignalViewModel;
export type EventsDataType = InvestmentEventViewModels;
export type LevelParametersDataType = LevelsParamsInfo;
