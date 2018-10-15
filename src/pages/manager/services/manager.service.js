import getParams from "utils/get-params";

import * as actions from "../actions/manager.actions.js";
import { MANAGER_SLUG_URL_PARAM_NAME } from "../manager.page";
import { MANAGER_DETAILS_ROUTE } from "../manager.page.js";

export const fetchManagerProfile = () => (dispatch, getState) => {
  const { routing } = getState();

  const managerSlugUrl = getParams(
    routing.location.pathname,
    MANAGER_DETAILS_ROUTE
  )[MANAGER_SLUG_URL_PARAM_NAME];

  dispatch(actions.fetchManagerProfile(managerSlugUrl));
};
