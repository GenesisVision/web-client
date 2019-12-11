import memoize from "fast-memoize";
import { IApiState } from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";

export type TSelectorData<T> = T | undefined;

export const apiErrorSelector = <T, U = RootState>(
  selector: (state: U) => IApiState<T>
) => {
  return (state: U): string => selector(state).errorMessage;
};

export const apiSelector = <T, U = RootState>(
  selector: (state: U) => IApiState<T>
) => {
  const func = memoize((data: TSelectorData<T>) => data);
  return (state: U): TSelectorData<T> => func(selector(state).data);
};

export const fieldSelector = <R1, S = RootState>(
  selector: (state: S) => R1
) => (state: S): R1 => selector(state);

export const apiFieldSelector = <R1, T, S = RootState>(
  innerApiSelector: (state: S) => TSelectorData<R1>,
  innerFieldSelector: (state: R1) => T,
  emptyValue?: T
) => (state: S) => {
  const data = innerApiSelector(state);
  return data !== undefined ? innerFieldSelector(data) : emptyValue!;
};
