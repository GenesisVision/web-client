import { getUrlWithQuery } from "utils/query";

export const TAGS = "tags";
export const TAGS_ROUTE = `/${TAGS}`;

export const getTagsUrl = (data: { tags?: string[] }) => {
  return getUrlWithQuery(TAGS_ROUTE, data);
};
