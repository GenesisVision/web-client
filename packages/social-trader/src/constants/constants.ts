import { Currency, SimpleChart } from "gv-api-web";

export enum SIZES {
  SMALL = "SMALL",
  MIDDLE = "MIDDLE",
  LARGE = "LARGE"
}

export enum ASSETS_TYPES {
  All = "All",
  Signal = "Signal",
  Program = "Program",
  Fund = "Fund"
}

export const REF_PARAM_NAME = "ref";
export const FUND_CURRENCY = "GVT";

export const MANAGER = "manager";
export const INVESTOR = "investor";
export const PROGRAM = "PROGRAM";
export const FUND = "FUND";

export enum STATUS {
  ACTIVE = "Active",
  INVESTING = "Investing",
  WITHDRAWING = "Withdrawing",
  ENDED = "Ended",
  CLOSED = "Closed",
  ARCHIVED = "Archived",
  PENDING = "Pending"
}

export const PROFIT_EVENT = "Profit";

export enum SORTING {
  DESC = "Desc",
  ASC = "Asc"
}
export interface IDataModel {
  items: any;
  total: number;
}

export enum FOLLOW_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT"
}

export enum ASSET {
  FOLLOW = "Follow",
  PROGRAM = "Program",
  FUND = "Fund"
}

export enum CREATE_ASSET {
  ACCOUNT = "Account",
  PROGRAM = "Program",
  FUND = "Fund"
}

export const DEFAULT_DECIMAL_SCALE = 8;

export interface IDashboardAssetChart {
  type: ASSETS_TYPES;
  id: string;
  title: string;
  currency?: Currency;
  equityChart: SimpleChart[];
  pnLChart?: SimpleChart[];
}

export const DECIMAL_SCALE_SMALL_VALUE = 4;
export const DECIMAL_SCALE_BIG_VALUE = 2;

export const SHOW_SUCCESS_TIME = 1000;
