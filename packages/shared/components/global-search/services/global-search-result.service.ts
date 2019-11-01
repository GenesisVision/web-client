import { SearchViewModelOld } from "gv-api-web";
import searchApi from "shared/services/api-client/search-api";
import authService from "shared/services/auth-service";
import { Nullable } from "shared/utils/types";

export const search = (
  queryValue: string = ""
): Promise<Nullable<SearchViewModelOld>> => {
  const trimmedQuery = queryValue.trim();
  if (trimmedQuery.length === 0) return Promise.resolve(null);

  let filters: RequestFilters = {
    mask: trimmedQuery,
    take: 10
  };
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }

  return searchApi.search(filters);
};

type RequestFilters = {
  mask: string;
  take: number;
  authorization?: string;
};
