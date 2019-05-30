import { FundFacet } from "gv-api-web";
import { FacetDataType } from "shared/components/facet-container/facet-container";
import getParams from "shared/utils/get-params";
import { MiddlewareDispatch, TGetState } from "shared/utils/types";

import { FUNDS_FACET_ROUTE, FUNDS_SLUG_URL_PARAM_NAME } from "../../funds.routes";

export const getCurrentFacet = () => (
  dispatch: MiddlewareDispatch,
  getState: TGetState
): FacetDataType => {
  const { router, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { fundsFacets } = platformData.data;
  const facetUrl = getParams(router.location.pathname, FUNDS_FACET_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];
  const facet = fundsFacets.find((x: FundFacet) => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet };
};
