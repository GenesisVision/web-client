import { NextPageContext } from "next";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getTopPortfolioEvents = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch
) => {
  const authorization = authService.getAuthArg(ctx);

  await dispatch(
    actions.fetchPortfolioEventsAction(authorization, {
      eventLocation: EVENT_LOCATION.Dashboard,
      take: 5
    })
  );
};
