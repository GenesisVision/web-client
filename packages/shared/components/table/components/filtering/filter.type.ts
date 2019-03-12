export type TFilter<T> = {
  name: string;
  value: T;
};

export interface FilterValue<T = any> {
  value: T;
  label: T;
}

export interface IInvestorEventFilterValue<T> extends FilterValue {}

export interface IManagerEventFilterValue<T> extends FilterValue {
  labelKey: string;
}

export interface SortingColumn {
  name: string;
  sortingName: string;
}
