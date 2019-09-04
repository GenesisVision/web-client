import { useRouter } from "next/router";
import qs from "qs";
import { Push } from "shared/components/link/link";
import {
  FilteringType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";

const useRouteFilters = (defaultFilter: any): UseRouteFilters => {
  const { asPath, pathname } = useRouter();
  const queryParams = qs.parse(asPath.slice(pathname.length + 1));
  const { sorting = "", page = 1, ...filtering } = queryParams;

  const updateFilter: UpdateFilter = filter => {
    const query = qs.stringify({
      ...queryParams,
      [filter.name]: filter.value
    });
    const route = query ? `${pathname}?${query}` : pathname;
    Push(route);
  };

  return [
    { ...defaultFilter, ...filtering },
    sorting,
    parseInt(page),
    updateFilter
  ];
};

export default useRouteFilters;

type UpdateFilter = (filter: TFilter) => void;
type UseRouteFilters = [FilteringType, string, number, UpdateFilter];
