import searchApi from "shared/services/api-client/search-api";
import { SearchViewModel } from "gv-api-web";
import { Nullable } from "shared/utils/types";

export const search = (
  queryValue: string = ""
): Promise<Nullable<SearchViewModel>> => {
  const trimmedQuery = queryValue.trim();
  if (trimmedQuery.length === 0) return Promise.resolve(null); //Promise.resolve({ programs: [], funds: [], managers: [] });
  const filters = {
    mask: trimmedQuery,
    take: 10
  };

  return searchApi.v10SearchGet(filters);
};
