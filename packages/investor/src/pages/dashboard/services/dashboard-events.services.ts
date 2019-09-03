import { CancelablePromise, InvestmentEventViewModels } from "gv-api-web";
import { NextPageContext } from "next";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch } from "shared/utils/types";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";

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

export const getEvents = (eventLocation: EVENT_LOCATION) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(filters, eventLocation);
