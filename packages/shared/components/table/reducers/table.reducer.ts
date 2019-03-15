import { AnyAction, Reducer, ReducersMapObject, combineReducers } from "redux";
import apiReducerFactory from "shared/reducers/api-reducer/api-reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import { IPaging } from "../helpers/paging.helpers";
import tableFiltersReducer from "./table-filters.reducer";

interface ITableReducerFactory {
  type: string;
  paging: IPaging;
  sorting?: string;
  filtering?: Object;
  defaultFilters?: Object;
  clearable: boolean;
  clearableActionType: string;
}

const tableReducerFactory = ({
  type,
  paging,
  sorting,
  filtering,
  defaultFilters,
  clearable,
  clearableActionType
}: ITableReducerFactory) => {
  const clearableWrapper: (
    f: Reducer,
    clearActionType?: string
  ) => Reducer = clearable ? clearableReducer : f => f;
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
