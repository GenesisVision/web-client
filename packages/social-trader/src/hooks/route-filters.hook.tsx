import { Push } from "components/link/link";
import {
  FilteringType,
  TFilter
} from "components/table/components/filtering/filter.type";
import { useRouter } from "next/router";
import qs from "qs";

const useRouteFilters = (defaultFilter: any): UseRouteFilters => {
  const { asPath, pathname } = useRouter();
  const queryParams = qs.parse(asPath.slice(pathname.length + 1));
  const { sorting = "", page = 1, ...filtering } = queryParams;

  const updateFilter: UpdateFilter = filter => {
    const query = qs.stringify({
      ...queryParams,
      [filter.name]: filter.value
    });
    const basename = process.env.REACT_ROOT_ROUTE;
    const route = query ? `${pathname}?${query}` : pathname;
    Push(route.replace("/" + basename, ""));
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
