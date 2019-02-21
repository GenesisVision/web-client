export const MANAGER = "Manager";
export const INVESTOR = "Investor";
export const PROGRAM = "PROGRAM";
export const FUND = "FUND";
export const STATUS = {
  ACTIVE: "Active",
  INVESTING: "Investing",
  WITHDRAWING: "Withdrawing",
  ENDED: "Ended",
  CLOSED: "Closed",
  ARCHIVED: "Archived",
  PENDING: "Pending"
};
export const PROFIT_EVENT = "Profit";

export enum SORTING {
  DESC = "Desc",
  ASC = "Asc"
}
export interface IDataModel {
  items: any;
  total: number;
}
export interface IPaging {
  currentPage: number;
  itemsOnPage: number;
  totalPages: number;
}

export enum FOLLOW_TYPE {
  CREATE = "CREATE",
  EDIT = "EDIT"
}

export enum ROLE {
  INVESTOR = "Investor",
  MANAGER = "Manager"
}
export enum ASSET {
  PROGRAM = "PROGRAM",
  FUND = "FUND"
}
