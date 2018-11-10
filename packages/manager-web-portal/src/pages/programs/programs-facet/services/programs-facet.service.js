import { PROGRAMS_FACET_ROUTE } from "pages/programs/programs.routes";
import getParams from "shared/utils/get-params";

import { PROGRAM_SLUG_URL_PARAM_NAME } from "../../programs.routes";

export const getCurrentFacet = () => (dispatch, getState) => {
  const { routing, platformData } = getState();

  if (!platformData.settings.data) return { isPending: true };

  const { programsFacets } = platformData.settings.data;
  const facetUrl = getParams(routing.location.pathname, PROGRAMS_FACET_ROUTE)[
    PROGRAM_SLUG_URL_PARAM_NAME
  ];
  const facet = programsFacets.find(x => x.url === facetUrl);
  if (!facet) return { notFound: true };
  return { facet };
};
