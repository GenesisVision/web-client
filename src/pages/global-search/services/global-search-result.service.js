import { searchApiProxy } from "services/api-client/search-api";

export const globalSearchGetPrograms = queryValue => {
  if (queryValue.length === "") return Promise.reject();
  const filters = {
    mask: queryValue,
    take: 10
  };
  return searchApiProxy.v10SearchGet(filters);
};
