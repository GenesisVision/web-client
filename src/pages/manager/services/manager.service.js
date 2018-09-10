import getParams from "utils/get-params";

import * as actions from "../actions/manager.actions.js";
import { MANAGER_DETAILS_ROUTE } from "../manager.page.js";

export const fetchManagerProfile = () => (dispatch, getState) => {
  const { routing } = getState();

  const { managerId } = getParams(
    routing.location.pathname,
    MANAGER_DETAILS_ROUTE
  );

  dispatch(actions.fetchManagerProfile(managerId));
};
