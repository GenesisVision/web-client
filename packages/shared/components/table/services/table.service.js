import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import {
  calculateSkipAndTake,
  calculateTotalPages
} from "shared/components/table/helpers/paging.helpers";
import { updateFilters as updateFiltersActionCreator } from "../actions/table.actions";

export const composeRequestFilters = ({
  paging,
  sorting,
  filtering,
  defaultFilters
}) => {
  const { skip, take } = calculateSkipAndTake(paging);

  const composedFiltering = composeFilters(defaultFilters, filtering);

  const filters = {
    skip,
    take,
    sorting,
    ...composedFiltering
  };

  return filters;
};

export const updateFilters = (filters, type) => dispatch => {
  dispatch(updateFiltersActionCreator(filters, type));
};

export const getItems = (fetchItems, dataSelector) => (dispatch, getState) => {
  const { filters, defaults } = dataSelector(getState());

  const requestFilters = composeRequestFilters({
    ...filters,
    defaultFilters: defaults.defaultFilters
  });

  dispatch(fetchItems(requestFilters)).then(response => {
    const totalPages = calculateTotalPages(
      response.value.total,
      filters.paging.itemsOnPage
    );

    dispatch(
      updateFilters(
        {
          paging: {
            ...filters.paging,
            totalPages
          }
        },
        defaults.type
      )
    );
  });
};
