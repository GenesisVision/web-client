import { CancelablePromise, InvestmentEventViewModels } from "gv-api-web";
import { Dispatch } from "redux";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import authService from "shared/services/auth-service";
import { ActionType } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";

export const getTopPortfolioEvents = (dispatch: Dispatch) => {
  const authorization = authService.getAuthArg();

  dispatch(
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
