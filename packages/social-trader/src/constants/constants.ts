import { Currency, SimpleChart } from "gv-api-web";

export enum ASSETS_TYPES {
  All = "All",
  Follow = "Follow",
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

export type TableDataType<T> = IDataModel<Array<T>>;

export interface IDataModel<T = any> {
  items: T;
  total: number;
}

export enum FOLLOW_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT"
}

export enum TRADE_ASSET_TYPE {
  ACCOUNT = "Account",
  PROGRAM = "Program",
  FOLLOW = "Follow"
}

export enum ASSET {
  FOLLOW = "Follow",
  PROGRAM = "Program",
  FUND = "Fund"
}

export enum CREATE_ASSET {
  EXCHANGE_ACCOUNT = "ExchangeAccount",
  ACCOUNT = "Account",
  PROGRAM = "Program",
  EXCHANGE_PROGRAM = "ExchangeProgram",
  SELF_MANAGED_FUND = "SelfManagedFund",
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
