import { NextPageContext } from "next";
import { Dispatch } from "redux";
import authService from "shared/services/auth-service";

import * as actions from "../actions/dashboard.actions";

export const getTopPortfolioEvents = (ctx?: NextPageContext) => (
  dispatch: Dispatch
) => {
  const authorization = authService.getAuthArg(ctx);
  dispatch(actions.fetchPortfolioEventsAction(authorization, { take: 5 }));
};
