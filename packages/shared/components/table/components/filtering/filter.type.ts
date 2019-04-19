import { FILTER_TYPE } from "../../helpers/filtering.helpers";

export type RequestFiltersType<T> = {
  [key in keyof T]: string | number | Date
};

interface IFilterBase {
  name: string;
}

export interface IFilter<T> extends IFilterBase {
  value: T;
}

export interface IDefaultFilter<T> extends IFilterBase {
  type: FILTER_TYPE;
  defaultValue: T;
  composeRequestValue?(value?: any): Object;
  validate?(value: T): boolean;
}

export interface IDefaultFilters<T> {
  [key: number]: IDefaultFilter<T[keyof T]>;
}

export type IFiltering<T extends {}> = { [key in keyof T]: T[key] };

export interface SelectFilterValue<T = any> {
  value: T | undefined;
  label?: T;
  labelKey?: string;
}

export interface SortingColumn {
  name: string;
  sortingName?: string;
}

export type ComposeFiltersAllType = {
  [keys: string]: any;
};
