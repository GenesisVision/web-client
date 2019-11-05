import { ChartSimple } from "gv-api-web";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { CurrencyEnum } from "shared/utils/types";

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

export enum ROLE {
  INVESTOR = "investor",
  MANAGER = "manager"
}
export enum ASSET {
  FOLLOW = "FOLLOW",
  PROGRAM = "PROGRAM",
  FUND = "FUND"
}

export const ROLE_ENV = process.env.REACT_APP_PLATFORM as ROLE;

export const DEFAULT_DECIMAL_SCALE = 8;

export interface IDashboardAssetChart {
  type: ASSETS_TYPES;
  id: string;
  title: string;
  currency?: CurrencyEnum;
  equityChart: ChartSimple[];
  pnLChart?: ChartSimple[];
}

export const DECIMAL_SCALE_SMALL_VALUE = 4;
export const DECIMAL_SCALE_BIG_VALUE = 2;
