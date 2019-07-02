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

export const fieldSelector = <R1, S = RootState>(selector: (state: S) => R1) =>
  memoize((state: S): R1 => selector(state));

export const apiFieldSelector = <R1, T, S = RootState>(
  innerApiSelector: (state: S) => TData<R1>,
  innerFieldSelector: (state: R1) => T,
  emptyValue?: T
) => (state: S) => {
  const data = innerApiSelector(state);
  return data !== undefined ? innerFieldSelector(data) : emptyValue!;
};
