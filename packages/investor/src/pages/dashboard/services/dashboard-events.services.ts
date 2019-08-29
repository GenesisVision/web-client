import { Dispatch } from "redux";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getTopPortfolioEvents = (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(
    actions.fetchPortfolioEventsAction(authorization, {
      eventLocation: EVENT_LOCATION.Dashboard,
      take: 5
    })
  );
};
