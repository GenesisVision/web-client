import { CancelablePromise, CommonPublicAssetsViewModel } from "gv-api-web";
import searchApi from "services/api-client/search-api";
import authService from "services/auth-service";
import { Nullable } from "utils/types";

export const search = (
  queryValue: string = ""
): CancelablePromise<Nullable<CommonPublicAssetsViewModel>> => {
  const trimmedQuery = queryValue.trim();
  if (trimmedQuery.length === 0)
    return (Promise.resolve(null) as unknown) as CancelablePromise<
      Nullable<CommonPublicAssetsViewModel>
    >;

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
