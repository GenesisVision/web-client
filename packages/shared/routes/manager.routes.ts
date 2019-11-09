import { ToType } from "shared/components/link/link";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { SLUG_URL_REGEXP } from "shared/utils/constants";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/managers";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_FOLDER_ROUTE = `${MANAGERS_ROUTE}/[id]`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const managerToPathCreator = (url: string, title: string): ToType => ({
  as: composeManagerDetailsUrl(url),
  pathname: MANAGER_DETAILS_FOLDER_ROUTE,
  state: `/ ${title}`
});
