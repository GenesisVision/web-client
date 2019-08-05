import { useRouter } from "next/router";
import qs from "qs";

import { TFilter } from "../components/table/components/filtering/filter.type";

const useRouteFilters = (url: string, defaultFilter: any): any => {
  const { asPath, pathname, push } = useRouter();
  const queryParams = qs.parse(asPath.slice(pathname.length + 1));
  const { sorting = "", page = 1, ...filtering } = queryParams;

  const updateFilter = (filter: TFilter) => {
    const nf = {
      ...queryParams,
      [filter.name]: filter.value
    };
    const route = `${url}?${qs.stringify(nf)}`;
    push(route);
  };

  return [
    { ...defaultFilter, ...filtering },
    sorting,
    parseInt(page),
    updateFilter
  ];
};

export default useRouteFilters;
