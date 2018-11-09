import { composeFilters } from "../helpers/filtering.helpers";
import { calculateSkipAndTake } from "../helpers/paging.helpers";

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
