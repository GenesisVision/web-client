import {
  ChartSimple,
  ProgramBalanceChart,
  ProgramProfitChart
} from "gv-api-web";
import { CurrencyEnum } from "shared/utils/types";

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

export type ProgramDetailsProfitChart = {
  balance: number;
  timeFrameProgramCurrencyProfit: number;
  timeFrameGvtProfit: number;
  programCurrency: CurrencyEnum;
  profitChangePercent: number;
  equityChart: ChartSimple[];
};

export type ProgramStatisticResult = {
  statistic: ProgramDetailsStatistic;
  profitChart: ProgramProfitChart;
  balanceChart: ProgramBalanceChart;
};
