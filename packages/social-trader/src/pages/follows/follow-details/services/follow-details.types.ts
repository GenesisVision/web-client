import {
  ProgramBalanceChart,
  ProgramProfitCharts,
  SimpleChart
} from "gv-api-web";
import { CurrencyEnum } from "shared/utils/types";

export type FollowDetailsStatistic = {
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

export type FollowDetailsProfitChart = {
  balance: number;
  timeFrameProgramCurrencyProfit: number;
  timeFrameGvtProfit: number;
  programCurrency: CurrencyEnum;
  profitChangePercent: number;
  equityChart: SimpleChart[];
};

export type FollowStatisticResult = {
  statistic: FollowDetailsStatistic;
  profitChart: ProgramProfitCharts;
  balanceChart: ProgramBalanceChart;
};
