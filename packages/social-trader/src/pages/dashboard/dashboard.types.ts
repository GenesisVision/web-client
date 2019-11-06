import {
  DashboardInvestingDetails,
  DashboardSummary,
  DashboardTimeframeProfit,
  DashboardTradingDetails,
  InvestmentEventViewModel
} from "gv-api-web/dist";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

export type TDashboardTotal = DashboardSummary;

export type TDashboardTotalField = DashboardTimeframeProfit;

export interface TDashboardStatistic {
  total: TDashboardTotal;
  events: TDashboardEvent[];
}

export type TDashboardTradingStatistic = DashboardTradingDetails;

export type TDashboardInvestingStatistic = DashboardInvestingDetails;

export type TDashboardEvent = InvestmentEventViewModel;

export interface TAsset {
  login?: string;
  broker?: string;
  type: ASSET;
  currency: CurrencyEnum;
  id: string;
  url: string;
  title: string;
  levelProgress?: number;
  logo: string;
  level?: number;
  color: string;
  manager: { url: string; username: string };
  statistic: {
    ddown: number;
    age: number;
    leverage: number;
    profit: number;
    profitPercent: number;
    balance: {
      currency: CurrencyEnum;
      amount: number;
    };
  };

  value: number;
  chart: any;
}
export interface TRecommendation extends TAsset {}

export type TPieChartType = {
  name: string;
  color: string;
  percent: number;
};

export type TPortfolio = TPieChartType[];

export type TAssets = TPieChartType[];

export interface TTradingTotal {
  total: number;
  equity: number;
  AUM: number;
}

export interface TTrading {
  total: TTradingTotal;
  public: TAsset[];
  personal: TAsset[];
  followThem: TAsset[];
}
