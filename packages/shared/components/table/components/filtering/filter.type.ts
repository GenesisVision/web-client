export type TFilter<T> = {
  name: string;
  value: T;
};

export interface FilterValue<T = any> {
  value: T;
  label?: T;
  labelKey?: T;
}

export interface IInvestorEventFilterValue extends FilterValue {}

export interface IManagerEventFilterValue extends FilterValue {}

export interface SortingColumn {
  name: string;
  sortingName: string;
}
