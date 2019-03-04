import {
  PROGRAMS_FACET_ROUTE,
  PROGRAM_SLUG_URL_PARAM_NAME
} from "pages/programs/programs.routes";
import getParams from "shared/utils/get-params";

export const getCurrentFacet = () => (dispatch, getState) => {
  const { router, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { programsFacets } = platformData.data;
  const facetUrl = getParams(router.location.pathname, PROGRAMS_FACET_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  const facet = programsFacets.find(x => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet };
};
