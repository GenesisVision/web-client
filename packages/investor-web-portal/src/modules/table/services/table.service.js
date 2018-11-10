import { composeFilters } from "shared/components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "shared/components/table/helpers/paging.helpers";

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
