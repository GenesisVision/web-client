import { ChartSimple } from "gv-api-web";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { CurrencyEnum } from "shared/utils/types";

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
  PROGRAM = "PROGRAM",
  FUND = "FUND"
}

export const ROLE_ENV = process.env.REACT_APP_PLATFORM as ROLE;

export const DEFAULT_DECIMAL_SCALE = 8;

export const YEARS = "years";
export const MONTHS = "months";
export const DAYS = "days";
export const HOURS = "hours";
export const MINUTES = "minutes";
export const SECONDS = "seconds";

export type TUnitName =
  | "years"
  | "months"
  | "days"
  | "hours"
  | "minutes"
  | "seconds";

export const timeUnits = {
  [YEARS]: 0,
  [MONTHS]: 0,
  [DAYS]: 0,
  [HOURS]: 0,
  [MINUTES]: 0,
  [SECONDS]: 0
};

export interface IDashboardAssetChart {
  type: ASSETS_TYPES;
  id: string;
  title: string;
  currency?: CurrencyEnum;
  equityChart: ChartSimple[];
  pnLChart?: ChartSimple[];
}
