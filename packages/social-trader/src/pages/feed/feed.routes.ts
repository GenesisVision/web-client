import { getUrlWithQuery } from "utils/query";

export const FEED = "feed";
export const FEED_ROUTE = `/${FEED}`;

export const getFeedUrl = (data: { tags?: string[] }) => {
  return getUrlWithQuery(FEED_ROUTE, data);
};
