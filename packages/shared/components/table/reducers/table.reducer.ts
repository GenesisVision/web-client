import { combineReducers, Reducer } from "redux";
import clearableReducer from "shared/reducers/clearable.reducer";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { ActionType } from "shared/utils/types";

import { FilteringType } from "../components/filtering/filter.type";
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
  filtering?: FilteringType;
  defaultFilters?: Object;
  clearable?: boolean;
  clearableActionType?: string;
}

const tableReducerFactory = <ItemsType>({
  type,
  paging,
  sorting,
  filtering,
  defaultFilters,
  clearable = false,
  clearableActionType = ""
}: ITableReducerFactoryParams): Reducer<ITableState<ItemsType>, ActionType> => {
  const clearableWrapper: (
    f: Reducer<ITableState<ItemsType>, ActionType>,
    clearActionType?: string
  ) => Reducer<ITableState<ItemsType>, ActionType> = clearable
    ? clearableReducer
    : f => f;

  return clearableWrapper(
    combineReducers<ITableState<ItemsType>, ActionType>({
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
