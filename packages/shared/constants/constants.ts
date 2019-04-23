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

export const ROLE_ENV = process.env.REACT_APP_PLATFORM;
