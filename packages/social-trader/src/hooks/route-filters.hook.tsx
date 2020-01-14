import { Push } from "components/link/link";
import {
  FilteringType,
  TFilter
} from "components/table/components/filtering/filter.type";
import { useRouter } from "next/router";
import qs from "qs";
import { useCallback, useMemo } from "react";

const useRouteFilters = (defaultFilter: any): UseRouteFilters => {
  const basename = process.env.REACT_ROOT_ROUTE;
  const { asPath, pathname } = useRouter();
  const queryParams = qs.parse(asPath.slice(pathname.length + 1));
  const { sorting = "", page = 1, ...filtering } = queryParams;

  const updateFilter: UpdateFilter = useCallback(
    filter => {
      const query = qs.stringify({
        ...queryParams,
        [filter.name]: filter.value
      });
      const route = query ? `${pathname}?${query}` : pathname;
      Push(route.replace("/" + basename, ""));
    },
    [queryParams, pathname, basename]
  );

  const filters = useMemo(() => ({ ...defaultFilter, ...filtering }), [
    defaultFilter,
    filtering
  ]);

  return [filters, sorting, parseInt(page), updateFilter];
};

export default useRouteFilters;

type UpdateFilter = (filter: TFilter) => void;
type UseRouteFilters = [FilteringType, string, number, UpdateFilter];
