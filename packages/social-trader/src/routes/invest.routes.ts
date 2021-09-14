import { SLUG_URL_PARAM_NAME } from "./app.routes";

export const INVEST = "invest";
export const INVEST_ROUTE = `/${INVEST}`;

export const SETTINGS = `settings`;
export const FACETS = "facets";
export const FAVORITES_TAB_NAME = "favorites";
export const EXPLORE_TAB_NAME = "";

export const FOLLOW = "follow";
export const FOLLOWS = `${FOLLOW}s`;
export const GV_FOLLOW_ROUTE = `${INVEST_ROUTE}/${FOLLOW}`;
export const FOLLOW_DETAILS_SLUG_ROUTE = `${GV_FOLLOW_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const FOLLOW_DETAILS_FOLDER_ROUTE = `${GV_FOLLOW_ROUTE}/[id]`;
export const FOLLOW_SETTINGS_FOLDER_ROUTE = `${GV_FOLLOW_ROUTE}/[id]/${SETTINGS}`;
export const FOLLOW_FACET_ROUTE = `${GV_FOLLOW_ROUTE}/${FACETS}/:${SLUG_URL_PARAM_NAME}`;
export const FOLLOW_FACET_FOLDER_ROUTE = `${GV_FOLLOW_ROUTE}/${FACETS}/[id]`;
export const FOLLOW_TAB_ROUTE = `${GV_FOLLOW_ROUTE}/:tab`;

export const FUND = "fund";
export const FUNDS = `${FUND}s`;
export const GV_FUNDS_ROUTE = `${INVEST_ROUTE}/${FUNDS}`;
export const FUND_DETAILS_SLUG_ROUTE = `${GV_FUNDS_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const FUND_DETAILS_FOLDER_ROUTE = `${GV_FUNDS_ROUTE}/[id]`;
export const FUND_SETTINGS_FOLDER_ROUTE = `${GV_FUNDS_ROUTE}/[id]/${SETTINGS}`;
export const FUND_FACET_ROUTE = `${GV_FUNDS_ROUTE}/${FACETS}/:${SLUG_URL_PARAM_NAME}`;
export const FUND_FACET_FOLDER_ROUTE = `${GV_FUNDS_ROUTE}/${FACETS}/[id]`;
export const FUND_TAB_ROUTE = `${GV_FUNDS_ROUTE}/:tab`;

export const PROGRAM = "program";
export const PROGRAMS = `${PROGRAM}s`;
export const GV_PROGRAMS_ROUTE = `${INVEST_ROUTE}/${PROGRAMS}`;
export const PROGRAM_DETAILS_SLUG_ROUTE = `${GV_PROGRAMS_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const PROGRAM_DETAILS_FOLDER_ROUTE = `${GV_PROGRAMS_ROUTE}/[id]`;
export const PROGRAM_SETTINGS_FOLDER_ROUTE = `${GV_PROGRAMS_ROUTE}/[id]/${SETTINGS}`;
export const PROGRAMS_FACET_ROUTE = `${GV_PROGRAMS_ROUTE}/${FACETS}/:${SLUG_URL_PARAM_NAME}`;
export const PROGRAMS_FACET_FOLDER_ROUTE = `${GV_PROGRAMS_ROUTE}/${FACETS}/[id]`;
export const PROGRAMS_TAB_ROUTE = `${GV_PROGRAMS_ROUTE}/:tab`;

export const ASSET = "asset";
export const ASSETS = `${ASSET}s`;
export const GV_ASSETS_ROUTE = `${INVEST_ROUTE}/${ASSETS}`;
