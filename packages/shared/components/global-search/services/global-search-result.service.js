import searchApi from "shared/services/api-client/search-api";

export const search = (queryValue = "") => {
  const trimmedQuery = queryValue.trim();
  if (trimmedQuery.length === 0) return Promise.resolve({ data: {} });
  const filters = {
    mask: trimmedQuery,
    take: 10
  };

  return searchApi.v10SearchGet(filters);
};
