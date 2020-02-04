import {
  GLOBAL_SEARCH_INPUT,
  GlobalSearchActionType,
  GlobalSearchStateDataType
} from "components/global-search/reducers/global-search.reducer";

export const globalSearchInputAction = (
  inputValue: GlobalSearchStateDataType
): GlobalSearchActionType => ({
  type: GLOBAL_SEARCH_INPUT,
  payload: inputValue
});
