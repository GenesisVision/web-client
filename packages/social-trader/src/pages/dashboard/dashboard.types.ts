import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "shared/utils/types";

export interface TDashboardTotal {
  day: TDashboardTotalField;
  week: TDashboardTotalField;
  month: TDashboardTotalField;
}

export interface TDashboardTotalField {
  value: number;
  profit: number;
}

export interface TDashboardStatistic {
  total: TDashboardTotal;
  events: TDashboardEvent[];
}

export interface TDashboardProgramsStatistic extends TDashboardStatistic {
  equity: number;
  AUM: number;
}

export interface TDashboardInvestingStatistic extends TDashboardStatistic {
  balance: number;
  programs: number;
  funds: number;
}

export interface TDashboardEvent {
  data: Date;
  description: string;
  amount: number;
}

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
