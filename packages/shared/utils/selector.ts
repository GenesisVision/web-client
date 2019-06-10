import { IApiState } from "shared/reducers/reducer-creators/api-reducer";

export const apiSelector = <T>(state: IApiState<T>): T | undefined =>
  state.data ? state.data : undefined;
