import memoize from "fast-memoize";
import { IApiState } from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";

export const apiSelector = <T>(
  selector: (state: RootState) => IApiState<T>
) => {
  const func = memoize((data: T | undefined) => data);
  return (state: RootState): T | undefined => func(selector(state).data);
};
