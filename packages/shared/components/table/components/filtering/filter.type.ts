export type TFilter<T> = {
  name: string;
  value: T;
};

export interface IInvestorEventFilterValue<T> {
  value: T;
  label: T;
}

export interface IManagerEventFilterValue<T> {
  value: T;
  labelKey: string;
  label?: string;
}
