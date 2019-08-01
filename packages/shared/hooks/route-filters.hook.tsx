import { useRouter } from "next/router";
import qs from "qs";
import { useContext } from "react";

import { calculateTotalPages } from "../components/table/helpers/paging.helpers";
import { PROGRAMS_ROUTE } from "../routes/programs.routes";

const useRouteFilters = (url: string, defaultFilter: any): any => {
  const { asPath, pathname, push } = useRouter();
  const filtering = qs.parse(asPath.slice(pathname.length + 1));
  const updateFilter = (filter: any) => {
    const nf = {
      ...filtering,
      [filter.name]: filter.value
    };
    const route = `${url}?${qs.stringify(nf)}`;
    push(route);
  };
  return [{ ...filtering, ...defaultFilter }, updateFilter];
};

export default useRouteFilters;
