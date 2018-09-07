import { setQueryValue } from "../actions/global-serch.actions";
import { globalSearchResult } from "./global-search-result.service";

export const updateQueryValue = value => (dispatch, getState) => {
  dispatch(setQueryValue(value));
  dispatch(globalSearchResult.getItems());
};
