import { PROGRAMS_FACET_ROUTE } from "pages/programs/programs.routes";
import getParams from "utils/get-params";

import { PROGRAM_SLUG_URL_PARAM_NAME } from "../../programs.routes";

export const getCurrentFacet = () => (dispatch, getState) => {
  const { routing, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { facets } = platformData.data;
  const facetUrl = getParams(routing.location.pathname, PROGRAMS_FACET_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  const facet = facets.find(x => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet };
};
