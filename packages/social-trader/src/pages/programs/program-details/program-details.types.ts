import { IDialogProps } from "components/dialog/dialog";
import {
  LevelsParamsInfo,
  ProfitChart,
  ProgramBalanceChart,
  ProgramDetailsFull
} from "gv-api-web";
import { CurrencyEnum } from "utils/types";

export interface IProgramWithdrawalContainerProps extends IDialogProps {
  id: string;
  assetCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  onSubmit(): void;
}

export type HistoryCountsType = {
  eventsCount?: number;
  tradesCount?: number;
  openPositionsCount?: number;
  reallocateCount?: number;
  subscriptionsCount?: number;
  periodHistoryCount?: number;
};

export interface IChangePasswordTradingAccountProps {
  programDescription: ProgramDetailsFull;
}

export interface ILevelCalculatorProps {
  id: string;
  title: string;
  currency: CurrencyEnum;
  levelsParameters: LevelsParamsInfo;
  isKycConfirmed: boolean;
}
export type ProgramDetailsStatistic = {
  trades: number;
  successTradesPercent: number;
  profitFactor: number;
  investors: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  periodStarts: Date;
  periodEnds: Date;
  tradingVolume: number;
};

export type ProgramStatisticResult = {
  statistic: ProgramDetailsStatistic;
  profitChart: ProfitChart;
  balanceChart: ProgramBalanceChart;
};
