import { combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import tableFiltersReducer from "./table-filters.reducer";
import { IPaging } from "../helpers/paging.helpers";

interface ITableReducerFactory {
  type: string;
  paging: IPaging;
  sorting?: string;
  filtering?: Object;
  defaultFilters?: Object;
  clearable?: boolean;
  clearableActionType: string;
}

const tableReducerFactory = ({
  type,
  paging,
  sorting = undefined,
  filtering = undefined,
  defaultFilters = undefined,
  clearable = false,
  clearableActionType
}: ITableReducerFactory) => {
  const clearableWrapper = clearable ? clearableReducer : f => f;

  return clearableWrapper(
    combineReducers({
      itemsData: apiReducerFactory({
        apiType: type
      }),
      filters: tableFiltersReducer({
        type,
        filters: {
          paging,
          sorting,
          filtering
        }
      }),
      defaults: () => ({
        defaultFilters,
        type
      })
    }),
    clearableActionType
  );
};

export default tableReducerFactory;
