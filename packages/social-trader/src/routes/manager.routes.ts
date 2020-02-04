import { ToType } from "components/link/link";
import { createToUrl } from "components/link/link.helper";
import { composeManagerDetailsUrl } from "utils/compose-url";
import { SLUG_URL_REGEXP } from "utils/constants";

export const MANAGER_SLUG_URL_PARAM_NAME = "managerSlugUrl";

export const MANAGERS_ROUTE = "/users";
export const MANAGER_DETAILS_ROUTE = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}`;
export const MANAGER_DETAILS_FOLDER_ROUTE = `${MANAGERS_ROUTE}/[id]`;
export const MANAGER_DETAILS_ROUTE_REGEXP = `${MANAGERS_ROUTE}/:${MANAGER_SLUG_URL_PARAM_NAME}(${SLUG_URL_REGEXP})`;

export const managerToPathCreator = (url: string, title: string): ToType =>
  createToUrl(
    composeManagerDetailsUrl(url),
    MANAGER_DETAILS_FOLDER_ROUTE,
    title
  );
