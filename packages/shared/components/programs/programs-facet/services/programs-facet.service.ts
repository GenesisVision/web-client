import { ProgramFacet } from "gv-api-web";
import { FacetDataType } from "shared/components/facet-container/facet-container";
import {
  PROGRAM_SLUG_URL_PARAM_NAME,
  PROGRAMS_FACET_ROUTE
} from "shared/routes/programs.routes";
import getParams from "shared/utils/get-params";
import { MiddlewareDispatch, TGetState } from "shared/utils/types";

export const getCurrentFacet = () => (
  dispatch: MiddlewareDispatch,
  getState: TGetState
): FacetDataType => {
  const { router, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { programsFacets } = platformData.data;
  const facetUrl = getParams(router.location.pathname, PROGRAMS_FACET_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  const facet = programsFacets.find((x: ProgramFacet) => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet, isPending: false };
};
