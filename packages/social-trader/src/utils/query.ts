import * as querystring from "querystring";
import { ParsedUrlQueryInput } from "querystring";

export type QueryDataType = ParsedUrlQueryInput;

export const convertToQuery = (data: QueryDataType): string => {
  return querystring.stringify(data);
};

export const getUrlWithQuery = (route: string, data: QueryDataType): string => {
  const query = convertToQuery(data);
  return query ? `${route}?${query}` : route;
};
