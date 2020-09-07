import { BROKER_PARAM_NAME } from "pages/create-account/create-account.constants";
import * as qs from "qs";
import { NextPageWithReduxContext } from "utils/types";

export const getBrokerFromContext = ({
  asPath = "",
  pathname
}: NextPageWithReduxContext): string => {
  const requestParams = qs.parse(asPath.slice(pathname.length + 1));
  return requestParams[BROKER_PARAM_NAME];
};
