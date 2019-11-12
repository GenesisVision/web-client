import { Dispatch } from "redux";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages,
  IPaging
} from "shared/components/table/helpers/paging.helpers";
import { TGetState } from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { updateFiltersAction as updateFiltersActionCreator } from "../actions/table.actions";
import {
  ComposeFiltersAllType,
  FilteringType
} from "../components/filtering/filter.type";
import { IComposeDefaultFilter } from "../components/table.types";
import { ITableState } from "../reducers/table.reducer";

interface IComposeRequestFiltersProps {
  paging?: IPaging;
  sorting?: string;
  filtering?: FilteringType;
  defaultFilters?: IComposeDefaultFilter[];
}
export const composeRequestFilters = ({
  paging = {},
  sorting = "",
  filtering = {},
  defaultFilters = []
}: IComposeRequestFiltersProps): ComposeFiltersAllType => {
  const { skip, take } = calculateSkipAndTake(paging);
  const composedFiltering = composeFilters(defaultFilters, filtering);
  return {
    skip,
    take,
    sorting,
    ...composedFiltering
  };
};

export const composeRequestFiltersByTableState = (
  tableState: ITableState<any>
) => {
  const { filters, defaults } = tableState;
  const requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: defaults.defaultFilters
  });
  return requestFilters;
};

export const updateFilters = (filters: FilteringType, type: string) => (
  dispatch: Dispatch
) => {
  dispatch(updateFiltersActionCreator(filters, type));
};

export const updateFiltersDispatch = (
  filters: FilteringType,
  type: string,
  dispatch: Dispatch
) => {
  updateFilters(filters, type)(dispatch);
};

export const getItems = (
  fetchItems: (filters: ComposeFiltersAllType) => any,
  dataSelector: (opts?: RootState) => { [keys: string]: any }
) => (dispatch: Dispatch, getState: TGetState) => {
  const { filters, defaults } = dataSelector(getState());
  const requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: defaults.defaultFilters
  });
  dispatch(fetchItems(requestFilters)).then((response: any) => {
    //TODO any response
    const totalPages = calculateTotalPages(
      response.value.total,
      filters.paging.itemsOnPage
    );
    updateFiltersDispatch(
      {
        paging: {
          ...filters.paging,
          totalPages
        }
      },
      defaults.type,
      dispatch
    );
  });
};
