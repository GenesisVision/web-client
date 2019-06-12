import memoize from "fast-memoize";
import { IApiState } from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";

type TData<T> = T | undefined;

export const apiSelector = <T, U = RootState>(
  selector: (state: U) => IApiState<T>
) => {
  const func = memoize((data: TData<T>) => data);
  return (state: U): TData<T> => func(selector(state).data);
};

export const fieldSelector = <T = RootState>(selector: (state: T) => any) =>
  memoize((state: T): any => selector(state));

export const apiFieldSelector = <T, U = RootState>(
  innerApiSelector: (state: U) => TData<T>,
  innerFieldSelector: (state: T) => any,
  emptyValue?: any
) => (state: U) => {
  const data = innerApiSelector(state);
  return data ? innerFieldSelector(data) : emptyValue;
};
