import memoize from "fast-memoize";
import { IApiState } from "shared/reducers/reducer-creators/api-reducer";

export const apiSelector = () => {
  const func = memoize((data: any) => data);
  return <T>(state: IApiState<T>): T | undefined => func(state.data);
};
