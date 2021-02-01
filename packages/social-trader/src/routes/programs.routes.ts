import { SLUG_URL_PARAM_NAME } from "routes/app.routes";

export const PROGRAMS_FAVORITES_TAB_NAME = "favorites";
export const PROGRAMS_EXPLORE_TAB_NAME = "";

export const PROGRAMS_ROUTE = "/invest/programs";
export const PROGRAM_DETAILS_ROUTE = `${PROGRAMS_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]`;
export const PROGRAM_SETTINGS = `settings`;
export const PROGRAM_SETTINGS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]/${PROGRAM_SETTINGS}`;
export const PROGRAM_BANNERS = "banners";
export const PROGRAM_BANNERS_ROUTE = `${PROGRAM_DETAILS_ROUTE}/${PROGRAM_BANNERS}`;
export const PROGRAM_BANNERS_FOLDER_ROUTE = `${PROGRAM_DETAILS_FOLDER_ROUTE}/${PROGRAM_BANNERS}`;
export const PROGRAM_API_KEYS = `api-keys`;
export const PROGRAM_API_KEYS_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/[id]/${PROGRAM_API_KEYS}`;

export const FACETS = "facets";
export const PROGRAMS_FACET_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/:${SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_FOLDER_ROUTE = `${PROGRAMS_ROUTE}/${FACETS}/[id]`;
export const PROGRAMS_TAB_ROUTE = `${PROGRAMS_ROUTE}/:tab`;

export const PROGRAM_BANNER_ROUTE = `/banners/programs/:${SLUG_URL_PARAM_NAME}/600x315.png`;
