import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";

import { composeFilteringActionType } from "../helpers/filtering.helpers";
import { composePaingActionType } from "../helpers/paging.helpers";
import { composeSortingActionType } from "../helpers/sorting.helpers";
import tableFilteringReducer from "./table-filtering.reducer";
import tablePagingReducer from "./table-paging.reducer";
import tableSortingReducer from "./table-sorting.reducer";

const tableReducerFactory = ({ type, paging, sorting, filters }) => {
  const tablePagingActionType = composePaingActionType(type);
  const tableFilteringActionType = composeFilteringActionType(type);
  const tableSortingActionType = composeSortingActionType(type);

  const tableReducer = {
    itemsData: apiReducerFactory({
      apiType: type
    })
  };
  if (paging !== undefined) {
    tableReducer.paging = tablePagingReducer({
      type: tablePagingActionType,
      paging
    });
  }
  if (sorting !== undefined) {
    tableReducer.sorting = tableSortingReducer({
      type: tableSortingActionType,
      sorting
    });
  }
  if (filters !== undefined) {
    tableReducer.filtering = tableFilteringReducer({
      type: tableFilteringActionType,
      filters: filters
    });
  }
  return combineReducers({
    ...tableReducer
  });
};

export default tableReducerFactory;
