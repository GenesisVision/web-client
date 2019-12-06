import {
  ProgramBalanceChart,
  ProgramProfitPercentCharts,
  SimpleChart
} from "gv-api-web";
import { CurrencyEnum } from "utils/types";

export type AccountDetailsStatistic = {
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

export type AccountDetailsProfitChart = {
  balance: number;
  timeFrameProgramCurrencyProfit: number;
  timeFrameGvtProfit: number;
  programCurrency: CurrencyEnum;
  profitChangePercent: number;
  equityChart: SimpleChart[];
};

export type AccountStatisticResult = {
  statistic: AccountDetailsStatistic;
  profitChart: ProgramProfitPercentCharts;
  balanceChart: ProgramBalanceChart;
};
