import { Push } from "components/link/link";
import {
  FilteringType,
  TFilter
} from "components/table/components/filtering/filter.type";
import { PAGING_FILTER_NAME } from "components/table/components/paging/paging";
import { SORTING_FILTER_NAME } from "components/table/components/sorting/sorting-filter/sorting-filter";
import {
  UpdatePagingFuncType,
  UpdateSortingFuncType
} from "components/table/components/table.types";
import { useRouter } from "next/router";
import qs from "qs";
import { useCallback, useMemo } from "react";

const isExcluded = (filters: string[], currentFilter: string): boolean =>
  filters.filter(filter => filter === currentFilter).length !== 0;

const FIRST_PAGE = 1;

const useRouteFilters = (
  defaultFilter: any,
  safePagingFilters: string[] = []
): UseRouteFilters => {
  const basename = process.env.REACT_ROOT_ROUTE;
  const { asPath, pathname } = useRouter();
  const queryParams = qs.parse(asPath.slice(pathname.length + 1));
  const { sorting = "", page = FIRST_PAGE, ...filtering } = queryParams;

  const updateFilter: UpdateFilter = useCallback(
    filter => {
      const isSafePagingFilter = isExcluded(
        [...safePagingFilters, PAGING_FILTER_NAME, SORTING_FILTER_NAME],
        filter.name
      );

      const query = qs.stringify({
        ...queryParams,
        [PAGING_FILTER_NAME]: isSafePagingFilter
          ? queryParams[PAGING_FILTER_NAME]
          : FIRST_PAGE,
        [filter.name]: filter.value
      });
      const route = query ? `${pathname}?${query}` : pathname;
      Push(route.replace("/" + basename, ""));
    },
    [safePagingFilters, queryParams, pathname, basename]
  );

  const filters = useMemo(() => ({ ...defaultFilter, ...filtering }), [
    defaultFilter,
    filtering
  ]);

  const updateSorting = useCallback(
    value => updateFilter({ name: SORTING_FILTER_NAME, value }),
    [updateFilter]
  );
  const updatePaging = useCallback(
    page => updateFilter({ name: PAGING_FILTER_NAME, value: page + 1 }),
    [updateFilter]
  );

  return [
    filters,
    sorting as string,
    parseInt(page as string),
    updateFilter,
    updateSorting,
    updatePaging
  ];
};

export default useRouteFilters;

type UpdateFilter = (filter: TFilter) => void;
type UseRouteFilters = [
  FilteringType,
  string,
  number,
  UpdateFilter,
  UpdateSortingFuncType,
  UpdatePagingFuncType
];
