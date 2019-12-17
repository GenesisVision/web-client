import { ToType } from "components/link/link";
import { SLUG_URL_REGEXP } from "shared/utils/constants";
import { composeManagerDetailsUrl } from "utils/compose-url";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/users";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_FOLDER_ROUTE = `${MANAGERS_ROUTE}/[id]`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const managerToPathCreator = (url: string, title: string): ToType => ({
  as: composeManagerDetailsUrl(url),
  pathname: MANAGER_DETAILS_FOLDER_ROUTE,
  state: `/ ${title}`
});
