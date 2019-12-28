import * as qs from "qs";
import { NextPageWithReduxContext } from "utils/types";

export const getBrokerFromContext = ({
  asPath = "",
  pathname
}: NextPageWithReduxContext): string => {
  const { broker } = qs.parse(asPath.slice(pathname.length + 1));
  return broker;
};
