import { CommonPublicAssetsViewModel } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { Nullable } from "utils/types";

export const search = (
  queryValue: string = ""
): Promise<Nullable<CommonPublicAssetsViewModel>> => {
  const trimmedQuery = queryValue.trim();
  if (trimmedQuery.length === 0)
    return (Promise.resolve(null) as unknown) as Promise<
      Nullable<CommonPublicAssetsViewModel>
    >;

  let filters: RequestFilters = {
    mask: trimmedQuery,
    take: 10
  };

  return api.search().search(filters);
};

type RequestFilters = {
  mask: string;
  take: number;
  authorization?: string;
};
