import clearableReducer from "reducers/clearable.reducer";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { RootState } from "reducers/root-reducer";
import { ActionType } from "utils/types";

export const GlobalSearchInitialState: GlobalSearchState = "";

export const GLOBAL_SEARCH_INPUT = "GLOBAL_SEARCH_INPUT";

export type GlobalSearchStateDataType = string;
export type GlobalSearchState = GlobalSearchStateDataType;
export type GlobalSearchActionType = ActionType<GlobalSearchState>;

export const globalSearchInputSelector: (
  state: RootState
) => GlobalSearchState = state => state.globalSearch;

export const globalSearchReducer = clearableReducer(
  (
    state: GlobalSearchState = GlobalSearchInitialState,
    action: GlobalSearchActionType
  ): GlobalSearchState =>
    defaultReducer<GlobalSearchActionType, GlobalSearchState>(
      action,
      state,
      GlobalSearchInitialState,
      GLOBAL_SEARCH_INPUT
    )
);
