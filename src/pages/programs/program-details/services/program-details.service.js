import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import authService from "services/auth-service";
import getParams from "utils/get-params";

import * as actions from "../actions/program-details-actions";

export const fetchProgramDetails = () => (dispatch, getState) => {
  const authorization = authService.getAuthArg();
  const { routing } = getState();

  const { programId } = getParams(
    routing.location.pathname,
    PROGRAM_DETAILS_ROUTE
  );

  dispatch(actions.fetchProgramDetails({ programId, opts: { authorization } }));
};

export const toggleReinvest = () => (dispatch, getState) => {};
