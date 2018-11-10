import replaceParams from "shared/utils/replace-params";
export const PROGRAM_SLUG_URL_PARAM_NAME = "programSlugUrl";
export const PROGRAMS_ROUTE = "/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${PROGRAM_SLUG_URL_PARAM_NAME}`;
const ProgramsRoutes = () => null;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;
export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/facets/:${PROGRAM_SLUG_URL_PARAM_NAME}`;

export default ProgramsRoutes;
