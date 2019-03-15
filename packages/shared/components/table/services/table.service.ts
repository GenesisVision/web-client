import { Dispatch } from "redux";
import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  IPaging,
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";

import RootState from "../../../reducers/root-reducer";
import { updateFilters as updateFiltersActionCreator } from "../actions/table.actions";
import { FilteringType } from "../components/filtering/filter.type";
import { IComposeDefaultFilter } from "../components/table.types";

interface IComposeRequestFiltersProps {
  paging: IPaging;
  sorting: string | Object;
  filtering: FilteringType;
  defaultFilters: IComposeDefaultFilter[];
}
export const composeRequestFilters = ({
  paging,
  sorting,
  filtering,
  defaultFilters
}: IComposeRequestFiltersProps): { [keys: string]: any } => {
  const { skip, take } = calculateSkipAndTake(paging);
  //@ts-ignore
  const composedFiltering = composeFilters(defaultFilters, filtering);

  return {
    skip,
    take,
    sorting,
    ...composedFiltering
  };
};

export const updateFilters = (filters: Object, type: string) => (
  dispatch: Dispatch
) => {
  dispatch(updateFiltersActionCreator(filters, type));
};

export const updateFiltersDispatch = (
  filters: Object,
  type: string,
  dispatch: Dispatch
) => {
  updateFilters(filters, type)(dispatch);
};

export const getItems = (
  fetchItems: any,
  dataSelector: (opts?: RootState) => { [keys: string]: any }
) => (dispatch: Dispatch, getState: () => RootState) => {
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
