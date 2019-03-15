import { Reducer, combineReducers } from "redux";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/api-reducer/api-reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import { IPaging } from "../helpers/paging.helpers";
import tableFiltersReducer from "./table-filters.reducer";

export interface ITableState<ItemsType> {
  itemsData: IApiState<ItemsType>;
  filters: any;
  defaults: { defaultFilters: any; type: string };
}

interface ITableReducerFactoryParams {
  type: string;
  paging: IPaging;
  sorting?: string;
  filtering?: Object;
  defaultFilters?: Object;
  clearable: boolean;
  clearableActionType: string;
}

const tableReducerFactory = <ItemsType>({
  type,
  paging,
  sorting,
  filtering,
  defaultFilters,
  clearable,
  clearableActionType
}: ITableReducerFactoryParams): Reducer<ITableState<ItemsType>> => {
  const clearableWrapper: (
    f: Reducer,
    clearActionType?: string
  ) => Reducer = clearable ? clearableReducer : f => f;
  return clearableWrapper(
    combineReducers({
      itemsData: apiReducerFactory<ItemsType>({
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
