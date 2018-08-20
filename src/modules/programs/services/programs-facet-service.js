import { PROGRAMS_FACET_ROUTE } from "routes/programs.routes";
import getParams from "utils/get-params";

export const getCurrentFacet = () => (dispatch, getState) => {
  const { routing, platformData } = getState();

  if (!platformData.data) return { isPending: true };

  const { facets } = platformData.data;
  const { facetId } = getParams(
    routing.location.pathname,
    PROGRAMS_FACET_ROUTE
  );
  const facet = facets.find(x => x.id === facetId);
  if (!facet) return { notFound: true };
  return { facet };
};
