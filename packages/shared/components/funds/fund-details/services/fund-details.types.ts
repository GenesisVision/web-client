import { ChartSimple, FundBalanceChart } from "gv-api-web";

export type FundDetailsStatistic = {
  investors: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdown: number;
  creationDate: Date;
  calmarRatio: number;
  profitChangePercent: number;
  rebalances: number;
  balance: number;
};

export type FundDetailsProfitChart = {
  timeFrameUsdProfit: number;
  timeFrameGvtProfit: number;
  profitChangePercent: number;
  equityChart: ChartSimple[];
};

export type FundStatisticResult = {
  statistic: FundDetailsStatistic;
  profitChart: FundDetailsProfitChart;
  balanceChart: FundBalanceChart;
};
